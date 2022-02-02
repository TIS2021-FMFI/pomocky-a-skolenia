const { pool } = require('../database')
const {
    reversedReplacer,
    hashPassword,
    generatePassword,
    replacer,
    oblastiToList,
} = require('../../functions')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config.json')
const { transporter } = require('../../middleware/mailer')
const logger = require("../../middleware/logger");
const converter = require('json-2-csv');
const fs = require('fs');

const deleteUser = async (request, response) => {
    const email = request.body.email
    const user = request.user["user"]
    if (!user.is_admin){
        response.status(401).send({message:"Not admin"});
    }
    try {
        await pool.query('DELETE FROM pouzivatelia WHERE email=$1', [email])
        response.status(200).send({message:'DELETE was successful'})
    }catch (error){
        response.status(400).send({message:'DELETE was not successful', "error code":error.code, error:error.message})
    }
}

const getAll = async (request, response) => {
    const user = request.user["user"]
    if (!user.is_admin){
        response.status(401).send({message:"Not admin"});
    }
    try {
        const data = await pool.query('SELECT id, email, is_admin FROM pouzivatelia')
        let users = data.rows
        for (let i in users){
            let user = users[i]
            const email = user["email"]
            const oblasti = await pool.query(
                'SELECT oblast FROM pouzivatelia_oblast LEFT JOIN pouzivatelia ON pouzivatelia.id = id_pouzivatela LEFT JOIN oblast ON oblast.id = id_oblast WHERE email = $1',
                [email]
            )

            let oblastiToSand = []
            for (let j in oblasti.rows){
                oblastiToSand.push(oblasti.rows[j]["oblast"])
            }
            user["oblasti"] = Object.values(oblastiToSand)

        }

        response.status(200).send(users)
    }
    catch (error){
        response.status(400).send({message:"ERROR", "error code": error.message});
    }


}

const register = async (request, response) => {
    let encryptedPassword
    try {
        const { email, is_admin, oblasti } = JSON.parse(
            JSON.stringify(request.body, reversedReplacer)
        )

        if (!email) {
            response.status(400).send({ message: 'Email is required' })
        }

        const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
        const oldUser = await pool.query(queryText, [email])

        if (oldUser.rowCount === 1) {
            return response
                .status(409)
                .send({ message: 'User Already Exist. Please Login' })
        }

        const newpassword = generatePassword()

        const textForNewUser =
            'Vitajte v systéme GEFCO! \n' +
            'Boli ste pridaný medzi nových používateľov. Prihlasovacie údaje ' +
            'sú Váš mail a heslo: ' +
            newpassword +
            ' \nPo prvom prihlásení odporúčame heslo zmeniť.'

        const mailOptions = {
            from: config['MAILER']['EMAIL'],
            to: email,
            subject: 'Nový používateľ GEFCO',
            text: textForNewUser,
        }

        encryptedPassword = await hashPassword(newpassword)

        const queryText2 =
            'INSERT INTO pouzivatelia(email, heslo, is_admin) VALUES ($1, $2, $3) RETURNING id'
        const id = await pool.query(queryText2, [
            email,
            encryptedPassword,
            is_admin,
        ])

        if (!is_admin) {
            let queryText =
                'INSERT INTO pouzivatelia_oblast(id_pouzivatela, id_oblast) VALUES'
            for (const oblast of oblasti) {
                queryText = queryText.concat('($1,' + oblast + '),')
            }
            queryText = queryText.slice(0, -1)
            await pool.query('BEGIN')
            try {
                await pool.query(queryText, [id.rows[0].id])
            } catch (error) {
                await pool.query('ROLLBACK')
                response
                    .status(400)
                    .send({
                        message: 'REGISTER was not successful',
                        'error code': error.code,
                        error: error.message,
                    })
            }
            await pool.query('COMMIT')
        }

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return response.status(408).send({message: 'Email wasnt send'})
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
        response.status(200).send({ message: 'REGISTER was successful' })
    } catch (error) {
        response
            .status(400)
            .send({
                message: 'REGISTER was not successful',
                'error code': error.code,
                error: error.message,
            })
    }
}

const login = async (request, response) => {
    try {
        const { email, password } = request.body

        if (!(email && password)) {
            response.status(400).send({ message: 'All input is required' })
        }

        const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
        const data = await pool.query(queryText, [email])
        const user = data.rows[0]

        if (user && (await bcrypt.compare(password, user['heslo']))) {
            let is_admin = user.is_admin
            const token = jwt.sign(
                { user: { email, is_admin } },
                config['SECRET.KEY'],
                {
                    expiresIn: '2h',
                },
                {}
            )
            response.status(200).send({ token: token, isAdmin: is_admin })
        } else {
            response.status(400).send({ message: 'Invalid Credentials' })
        }
    } catch (err) {
        console.log(err)
    }
}

const updatePasswd = async (request, response) => {
    const user = request.user['user']
    const { password, newpassword } = request.body
    const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
    const data = await pool.query(queryText, [user.email])
    const userDB = data.rows[0]

    if (userDB && (await bcrypt.compare(password, userDB['heslo']))) {
        const queryText = 'UPDATE pouzivatelia SET heslo=$2 WHERE email=$1'
        await pool.query(queryText, [
            userDB['email'],
            await hashPassword(newpassword),
        ])
        response.status(200).send({ message: 'Heslo bolo zmenene' })
    } else {
        response.status(400).send({ message: 'Invalid Credentials' })
    }
}

const addOblast = async (request, response) => {
    const { email, oblasti } = request.body
    const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
    const oldUser = await pool.query(queryText, [email])

    if (oldUser.rowCount === 0) {
        return response.status(409).send({ message: 'User doesnt exist' })
    }

    let queryText2 =
        'INSERT INTO pouzivatelia_oblast(id_pouzivatela, id_oblast) VALUES'
    for (const oblast of oblasti) {
        queryText2 = queryText2.concat('($1,' + oblast + '),')
    }
    queryText2 = queryText2.slice(0, -1)
    await pool.query('BEGIN')

    try {
        await pool.query(queryText2, [oldUser.rows[0].id])
    } catch (error) {
        await pool.query('ROLLBACK')
        response
            .status(400)
            .send({
                message: 'UPDATE was not successful',
                'error code': error.code,
                error: error.message,
            })
    }
    await pool.query('COMMIT')
    response.status(200).send({ message: 'UPDATE was successful' })
}

const resetPasswd = async (request, response) => {
    const { email } = request.body
    const queryText = 'SELECT * FROM pouzivatelia WHERE email=$1'
    const oldUser = await pool.query(queryText, [email])

    if (oldUser.rowCount === 0) {
        return response.status(409).send({ message: 'User doesnt exist' })
    }
    const newpassword = generatePassword()

    const mailOptions = {
        from: config['MAILER']['EMAIL'],
        to: email,
        subject: 'RESET hesla',
        text: 'Nové heslo je :' + newpassword,
    }

    const queryText2 = 'UPDATE pouzivatelia SET heslo=$2 WHERE email=$1'
    await pool.query(queryText2, [email, await hashPassword(newpassword)])

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return response.status(408).send({ message: 'Email wasnt send' })
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
    response.status(200).send({ message: 'Heslo bolo zmenene' })
}

const daysBetweenDates = (d1, d2) => {
    if (!d1 || !d2) return 0
    return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24))
}

async function notify() {
    const queryText = "SELECT * FROM pouzivatelia"
    const users = await pool.query(queryText)

    let emails = []
    for (const key in users.rows) {
        emails.push(users.rows[key])
    }

    for (let u in emails) {
        const user = emails[u]
        const data = await pool.query(
            "SELECT zamestnanci.id as id_zamestnanca, datum_absolvovania, meno, priezvisko, karticka, zamestnanci.oblast , kod_skolenia, skolenia.id as id_skolenia ,(datum_absolvovania + interval '1 month' * dlzka_platnosti) AS koniec_platnosti, dlzka_platnosti FROM zamestnanci_skolenia LEFT JOIN zamestnanci ON zamestnanci_skolenia.id_zamestnanca = zamestnanci.id LEFT JOIN skolenia ON skolenia.id = zamestnanci_skolenia.id_skolenia WHERE (datum_absolvovania + interval '1 month' * (dlzka_platnosti - 2)) < now() AND dlzka_platnosti > 0"
        )

        let dataToSend = JSON.parse(JSON.stringify(data.rows, replacer))

        dataToSend = dataToSend
            .map((r) => ({
                ...r,
                pocet_dni_platnosti: daysBetweenDates(
                    new Date(Date.now()),
                    new Date(r.koniec_platnosti)
                ),
            }))
            .filter((r) => r.pocet_dni_platnosti <= 62)
            .sort((a, b) => a.pocet_dni_platnosti - b.pocet_dni_platnosti)

        dataToSend.forEach(zaznam =>{
            zaznam["datum_absolvovania"] = new Date(zaznam["datum_absolvovania"]).toLocaleDateString("sk-SK");
            zaznam["koniec_platnosti"] = new Date(zaznam["koniec_platnosti"]).toLocaleDateString("sk-SK")
        })

        let text = 'Končiace školenia pre tento mesiac:\n'
        if (!user.is_admin) {
            const oblasti = await pool.query(
                'SELECT oblast FROM pouzivatelia_oblast LEFT JOIN pouzivatelia ON pouzivatelia.id = id_pouzivatela LEFT JOIN oblast ON oblast.id = id_oblast WHERE email = $1',
                [user.email]
            )
            let list = oblastiToList(oblasti.rows)
            dataToSend = dataToSend.filter(function (entry) {
                return list.includes(entry.oblast)
            })
        }

        await converter.json2csv(dataToSend, (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFileSync('konciace.csv', csv);
        }, {emptyFieldValue : " "})

        const mailOptions = {
            from: config['MAILER']['EMAIL'],
            to: user.email,
            subject: 'Preškolenia',
            text: text,
            attachments: [{
                path: 'konciace.csv'
            }]
        }

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Email error: ' + error)
            } else {
                console.log('Email sent: ' + info.response)
            }
        })
    }
}

module.exports = {
    register,
    login,
    addOblast,
    updatePasswd,
    resetPasswd,
    notify,
    getAll,
    deleteUser
}