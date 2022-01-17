const {pool} = require("../database");
const {reversedReplacer, hashPassword, generatePassword, replacer, oblastiToList} = require("../../functions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const {transporter} = require("../../middleware/mailer");

const register = async (request, response) => {
    let encryptedPassword;
    try {
        const {email, password, is_admin, oblasti} = JSON.parse(JSON.stringify(request.body, reversedReplacer));

        if (!(email && password)) {
            response.status(400).send({message:"All input is required"});
        }

        const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
        const oldUser = await pool.query(queryText, [email])

        if (oldUser.rowCount === 1) {
            return response.status(409).send({message:"User Already Exist. Please Login"});
        }

        encryptedPassword = await hashPassword(password);

        const queryText2 = 'INSERT INTO pouzivatelia(email, heslo, is_admin) VALUES ($1, $2, $3) RETURNING id'
        const id = await pool.query(queryText2, [email, encryptedPassword, is_admin])

        if (!is_admin){
            let queryText = 'INSERT INTO pouzivatelia_oblast(id_pouzivatela, id_oblast) VALUES';
            for (const oblast of oblasti) {
                queryText = queryText.concat("($1," +oblast+"),")
            }
            queryText = queryText.slice(0, -1);
            await pool.query('BEGIN')
            try {
                await pool.query(queryText, [id.rows[0].id])
            }catch (error){
                await pool.query('ROLLBACK');
                response.status(400).send({message:'REGISTER was not successful',"error code":error.code ,error: error.message})
            }
            await pool.query('COMMIT')
        }

        response.status(200).send({message:'REGISTER was successful'});
    } catch (error) {
        response.status(400).send({message:'REGISTER was not successful',"error code":error.code ,error: error.message})

    }
}

const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!(email && password)) {
            response.status(400).send({message:"All input is required"});
        }

        const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
        const data = await pool.query(queryText, [email])
        const user = data.rows[0]

        if (user && (await bcrypt.compare(password, user["heslo"]))) {

            let is_admin = user.is_admin;
            const token = jwt.sign(
                { user:{email, is_admin}},
                config["SECRET.KEY"],
                {
                    expiresIn: "2h",
                },{}
            );
            response.status(200).send({"token": token});
        }else{
            response.status(400).send({message:"Invalid Credentials"});
        }
    } catch (err) {
        console.log(err);
    }
}

const updatePasswd = async (request, response) => {
    const user = request.user["user"]
    const {password, newpassword } = request.body;
    const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
    const data = await pool.query(queryText, [user.email])
    const userDB = data.rows[0]

    if (userDB && (await bcrypt.compare(password, userDB["heslo"]))) {
        const queryText = 'UPDATE pouzivatelia SET heslo=$2 WHERE email=$1'
        await pool.query(queryText, [userDB["email"], await hashPassword(newpassword)])
        response.status(200).send({message:"Heslo bolo zmenene"});
    }
    else{
        response.status(400).send({message:"Invalid Credentials"});
    }
}

const addOblast = async (request, response) => {
    const {email, oblasti} = request.body;
    const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
    const oldUser = await pool.query(queryText, [email])

    if (oldUser.rowCount === 0) {
        return response.status(409).send({message:"User doesnt exist"});
    }

    let queryText2 = 'INSERT INTO pouzivatelia_oblast(id_pouzivatela, id_oblast) VALUES';
    for (const oblast of oblasti) {
        queryText2 = queryText2.concat("($1," +oblast+"),")
    }
    queryText2 = queryText2.slice(0, -1);
    await pool.query('BEGIN')

    try {
        await pool.query(queryText2, [oldUser.rows[0].id])
    }catch (error){
        await pool.query('ROLLBACK')
        response.status(400).send({message:'UPDATE was not successful',"error code":error.code ,error: error.message})
    }
    await pool.query('COMMIT')
    response.status(200).send({message:'UPDATE was successful'})
}

const resetPasswd = async (request, response) => {
    const {email} = request.body;
    const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
    const oldUser = await pool.query(queryText, [email])

    if (oldUser.rowCount === 0) {
        return response.status(409).send({message:"User doesnt exist"});
    }
    const newpassword = generatePassword()

    const mailOptions = {
        from: config['MAILER']['EMAIL'],
        to: email,
        subject: "RESET hesla",
        text: 'Nové heslo je :' + newpassword
    };

    const queryText2 = 'UPDATE pouzivatelia SET heslo=$2 WHERE email=$1'
    await pool.query(queryText2, [email, await hashPassword(newpassword)])

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return response.status(408).send({message:"Email wasnt send"});
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    response.status(200).send({message:"Heslo bolo zmenene"});
}

//TODO spageta
async function notify(){
    const queryText = 'SELECT * FROM pouzivatelia'
    const users = await pool.query(queryText)
    let emails = []
    for (const key in users.rows){
        emails.push(users.rows[key])
    }
    for(let u in emails){
        const user = emails[u]

        await pool.query('SELECT DISTINCT zamestnanci.id as id_zamestnanca, datum_absolvovania, meno, priezvisko, karticka, zamestnanci.oblast , kod_skolenia, skolenia.id as id_skolenia ,(datum_absolvovania + interval \'1 month\' * dlzka_platnosti) AS koniec_platnosti, dlzka_platnosti FROM zamestnanci_skolenia LEFT JOIN zamestnanci ON zamestnanci_skolenia.id_zamestnanca = zamestnanci.id LEFT JOIN skolenia ON skolenia.id = zamestnanci_skolenia.id_skolenia WHERE (datum_absolvovania + interval \'1 month\' * (dlzka_platnosti - 2)) < now() AND dlzka_platnosti > 0', async (error, results) => {
            let dataToSend;
            if (error) {

            } else {
                dataToSend = JSON.parse(JSON.stringify(results.rows, replacer));
                if (user.is_admin) {
                    let text = ''

                    for (let i = 0; i < 10; i++) {
                        text = text + "Pracovník číslo " + dataToSend[i].karticka + " " + dataToSend[i].meno + " " + dataToSend[i].priezvisko + ", ktorý mal školenia " + dataToSend[i].kod_skolenia + " " + new Date(dataToSend[i].datum_absolvovania).toLocaleDateString("sk-SK") + " oblast:" + dataToSend[i].oblast + " \n"

                    }

                    const mailOptions = {
                        from: config['MAILER']['EMAIL'],
                        to: user.email,
                        subject: "Preškolenia",
                        text: text
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log('Email error: ' + error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                } else {
                    const oblasti = await pool.query('SELECT oblast FROM pouzivatelia_oblast LEFT JOIN pouzivatelia ON pouzivatelia.id = id_pouzivatela LEFT JOIN oblast ON oblast.id = id_oblast WHERE email = $1', [user.email])
                    let list = oblastiToList(oblasti.rows)
                    const readyData = dataToSend.filter(function (entry) {
                        return list.includes(entry.oblast)
                    });

                    let text = ''

                    for (let i = 0; i < 10; i++) {
                        text = text + "Pracovník číslo " + readyData[i].karticka + " " + readyData[i].meno + " " + readyData[i].priezvisko + ", ktorý mal školenia " + readyData[i].kod_skolenia + " " + new Date(readyData[i].datum_absolvovania).toLocaleDateString("sk-SK") + " oblast:" + readyData[i].oblast + " \n"

                    }

                    const mailOptions = {
                        from: config['MAILER']['EMAIL'],
                        to: user.email,
                        subject: "Preškolenia",
                        text: text
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log('Email error: ' + error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
            }
        })
    }
}

module.exports = {
    register, login, addOblast, updatePasswd, resetPasswd, notify
}