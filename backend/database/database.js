const Pool = require('pg').Pool;
const config = require("../config.json")["DATABASE"]

const pool = new Pool({
    user: config["USER"],
    host: config["HOST"],
    database: config["DATABASE"],
    password: config["PASSWORD"],
    dialect: config["DIALECT"],
    port: config["PORT"]
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

module.exports= {pool}