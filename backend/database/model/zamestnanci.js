const {pool} = require("../database");
const {replacer, reversedReplacer, oblastiToList} = require("../../functions");

const getAll = async (request, response) => {
    await pool.query('SELECT * FROM zamestnanci', async (error, results) => {
        const user = request.user["user"]
        let data;
        let list;
        if (error) {
            response.status(400).send(error.message, error.code)
        } else {
            data = JSON.parse(JSON.stringify(results.rows, replacer));
            if (user.is_admin) {
                response.status(200).send(data);
            } else {
                const oblasti = await pool.query('SELECT oblast FROM pouzivatelia_oblast LEFT JOIN pouzivatelia ON pouzivatelia.id = id_pouzivatela LEFT JOIN oblast ON oblast.id = id_oblast WHERE email = $1', [user.email])
                list = oblastiToList(oblasti.rows)
                const dataToSend = data.filter(function (entry) {
                    return list.includes(entry.oblast)
                });
                response.status(200).send(dataToSend);
            }
        }
    })
}

const getByID = async (request, response) => {
    const id = request.body.id
    await pool.query('SELECT * FROM zamestnanci WHERE id=$1', [id], (error, results) => {
        let data;
        if (error) {
            response.status(400).send(error.message, error.code)
        } else {
            data = JSON.parse(JSON.stringify(results.rows, replacer));
            response.status(200).send(data);
        }
    })
}

const getAllpoz = async (request, response) => {
    await pool.query('SELECT DISTINCT pozicia FROM zamestnanci', (error, results) => {
        if (error) {
            response.status(400).send(error.message, error.code)
        } else {
            response.status(200).send(results);
        }
    })
}

const updateUser = async (request, response) => {
    const id = request.body.id
    const {
        bufetka, datum_vydania, fa, karticka, kava, meno, oblast, osobne_cislo, pozicia, priezvisko, vzv, winnex, zfsatna, zfskrinka
    } = JSON.parse(JSON.stringify(request.body, reversedReplacer));

    try {
        await pool.query('BEGIN')
        const ob = await pool.query('SELECT * FROM oblast WHERE oblast=$1',[oblast])

        if (ob.rowCount === 0){
            await pool.query(`INSERT INTO oblast(oblast) VALUES($1)`,[oblast])
        }
        const queryText = 'UPDATE zamestnanci SET priezvisko=$1, meno=$2, pozicia=$3, fa=$4, oblast=$5, karticka=$6, osobne_cislo=$7, kava=$8, vzv=$9, datum_vydania=$10, bufetka=$11, zfsatna=$12, zfskrinka=$13, winnex=$14 WHERE id=$15'
        await pool.query(queryText, [priezvisko, meno, pozicia, fa, oblast, karticka, osobne_cislo, kava, vzv, datum_vydania, bufetka, zfsatna, zfskrinka, winnex, id])
        await pool.query('COMMIT')
        response.status(200).send({message:'UPDATE was successful'})
    }catch (error){
        await pool.query('ROLLBACK')
        response.status(400).send({message:'UPDATE was not successful', "error code":error.code, error:error.message})
    }
}

const deleteUser = async (request, response) => {
    const id = request.body.id
    try {
        await pool.query('DELETE FROM zamestnanci WHERE id=$1', [id])
        response.status(200).send({message:'DELETE was successful'})
    }catch (error){
        response.status(400).send({message:'DELETE was not successful', "error code":error.code, error:error.message})
    }
}

const addUser = async (request, response) => {
    const {
        bufetka, datum_vydania, fa, karticka, kava, meno, oblast, osobne_cislo, pozicia, priezvisko, vzv, winnex, zfsatna, zfskrinka
    } = JSON.parse(JSON.stringify(request.body, reversedReplacer));
    try{
        await pool.query('BEGIN')
        const ob = await pool.query('Select * from oblast WHERE oblast=$1',[oblast])
        if (ob.rowCount === 0){
            await pool.query(`INSERT INTO oblast(oblast) VALUES($1)`,[oblast])
        }
        const queryText = 'INSERT INTO zamestnanci(priezvisko, meno, pozicia, fa, oblast, karticka, osobne_cislo, kava, vzv, datum_vydania, bufetka, zfsatna, zfskrinka, winnex) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id'
        await pool.query(queryText, [priezvisko, meno, pozicia, fa, oblast, karticka, osobne_cislo, kava, vzv, datum_vydania, bufetka, zfsatna, zfskrinka, winnex])
        await pool.query('COMMIT')
        response.status(200).send({message:'Insertion was successful'})
    }
    catch (error) {
        await pool.query('ROLLBACK')
        response.status(400).send({message:'Insertion was not successful', "error code":error.code, error:error.message})
    }
}

module.exports = {
    getAll, getByID, getAllpoz, updateUser, deleteUser, addUser
}
