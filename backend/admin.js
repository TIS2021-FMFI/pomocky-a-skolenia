const { pool } = require('./database/database.js')
const {hashPassword} = require('./functions.js')

const heslo = process.argv[2]

async function run(){
    const encryptedPassword = await hashPassword(heslo)

    const queryText2 = 'INSERT INTO pouzivatelia(email, heslo, is_admin) VALUES ($1, $2, true) ON conflict(email) DO update set heslo=EXCLUDED.heslo'

    await pool.query(queryText2, ["admin", encryptedPassword])
}

run().then()
