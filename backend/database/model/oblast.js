const {pool} = require("../database");

const getAll = async (request, response) => {
    await pool.query('CALL clean_oblast()');
    await pool.query('SELECT * FROM oblast', (error, results) => {
        if (error) {
            response.status(400).send({"error code":error.code ,error: error.message})
        }
        else{
            response.status(200).send(results.rows)
        }
    })
}

const add = async (request, response) => {
    const oblast = request.body.oblast;
    pool.query('INSERT INTO oblast(oblast) VALUES($1)',[oblast], (error)=>{
        if(error){
            response.status(400).send({message:'Insertion was not successful', "error code":error.code ,error: error.message})
        }
        else{
            response.status(200).send({message:'Insertion was successful'})
        }
    })
}

module.exports = {
    getAll, add
}
