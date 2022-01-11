const {pool} = require("../database");
const {reversedReplacer, hashPassword} = require("../../functions");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config.json");

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
                await pool.query('ROLLBACK')
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


module.exports = {
    register, login, addOblast
}