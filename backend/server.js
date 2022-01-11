// Entry Point of the API Server 
  
const express = require('express');
  
/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: 'ggqxjolq',
    host: 'abul.db.elephantsql.com',
    database: 'ggqxjolq',
    password: 'M-hueRYiWJK11fJjxL2HNEImG18jkliD',
    dialect: 'postgres',
    port: 5432
});

/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
  
  
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

app.get('/oblasti', async (req, res, next) => {
    const testData = await pool.query('Select * from oblast')
    res.send(testData.rows);
})

function replacer(i, val) {
    if ( val === false )
    {
        return "false";
    }
    if (val === true){
        return "true"
    }
    if (val === null){
        return ""
    }
    else {
        return val;
    }
}

function reversedReplacer(i, val){
    if ( val === "false" )
    {
        return false;
    }
    if (val === "true"){
        return true
    }
    if (val === ""){
        return null
    }
    else {
        return val;
    }
}

app.post('/pridajoblasti', (req, res)=> {
    const ob = req.body.oblast;
    pool.query(`insert into oblast(oblast) values($1)`,[ob], (err, result)=>{
        if(!err){
            res.status(200).send({message:'Insertion was successful'})
        }
        else{ console.log(err.message);
            res.status(400).send({message:'Insertion was not successful'})
        }
    })
})

app.get('/zamestnanci', async (req, res, next) => {
    const testData = await pool.query('Select * from zamestnanci')
    data = JSON.parse(JSON.stringify(testData.rows, replacer));
    res.status(200).send(data);
})

app.get('/zamestnanecbyid', async (req, res, next) => {
    const id = req.body.id
    const testData = await pool.query('Select * FROM zamestnanci WHERE id=$1', [id])
    data = JSON.parse(JSON.stringify(testData.rows, replacer));
    res.status(200).send(data);
})

app.get('/pozicie', async (req, res, next) => {
    const testData = await pool.query('SELECT distinct pozicia FROM zamestnanci')
    res.status(200).send(testData.rows);
})

app.put('/upravzamestnanca', async (req, res)=> {
    const id = req.body.id
    const zamestnanec = JSON.parse(JSON.stringify(req.body, reversedReplacer));
    try {
        await pool.query('BEGIN')
        const ob = await pool.query('Select * from oblast WHERE oblast=$1',[zamestnanec.oblast])
        if (ob.rowCount === 0){
            await pool.query(`insert into oblast(oblast) values($1)`,[zamestnanec.oblast])
        }
        const queryText = 'UPDATE zamestnanci SET priezvisko=$1, meno=$2, pozicia=$3, fa=$4, oblast=$5, karticka=$6, osobne_cislo=$7, kava=$8, vzv=$9, datum_vydania=$10, bufetka=$11, zfsatna=$12, zfskrinka=$13, winnex=$14 WHERE id=$15'
        await pool.query(queryText, [zamestnanec.priezvisko, zamestnanec.meno, zamestnanec.pozicia, zamestnanec.fa, zamestnanec.oblast, zamestnanec.karticka, zamestnanec.osobne_cislo, zamestnanec.kava, zamestnanec.vzv, zamestnanec.datum_vydania, zamestnanec.bufetka, zamestnanec.zfsatna, zamestnanec.zfskrinka, zamestnanec.winnex, id])
        await pool.query('COMMIT')
        res.status(200).send({message:'UPDATE was successful'})
    }catch (e){
        await pool.query('ROLLBACK')
        res.status(400).send({message:'UPDATE was not successful'})
    }
})

app.delete('/zmazzamestnanca', async (req, res)=> {
    const id = req.body.id
    try {
        await pool.query('DELETE FROM zamestnanci WHERE id=$1', [id])
        res.status(200).send({message:'DELETE was successful'})
    }catch (e){
        res.status(400).send({message:'DELETE was not successful'})
    }
})

app.post('/pridajzamestnanca', async (req, res)=> {
    const zamestnanec = JSON.parse(JSON.stringify(req.body, reversedReplacer));
    try{
        await pool.query('BEGIN')
        const ob = await pool.query('Select * from oblast WHERE oblast=$1',[zamestnanec.oblast])
        if (ob.rowCount === 0){
           await pool.query(`insert into oblast(oblast) values($1)`,[zamestnanec.oblast])
        }
        const queryText = 'INSERT INTO zamestnanci(priezvisko, meno, pozicia, fa, oblast, karticka, osobne_cislo, kava, vzv, datum_vydania, bufetka, zfsatna, zfskrinka, winnex) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id'
        await pool.query(queryText, [zamestnanec.priezvisko, zamestnanec.meno, zamestnanec.pozicia, zamestnanec.fa, zamestnanec.oblast, zamestnanec.karticka, zamestnanec.osobne_cislo, zamestnanec.kava, zamestnanec.vzv, zamestnanec.datum_vydania, zamestnanec.bufetka, zamestnanec.zfsatna, zamestnanec.zfskrinka, zamestnanec.winnex])
        await pool.query('COMMIT')
        res.status(200).send({message:'Insertion was successful'})
    }
    catch (e) {
        await pool.query('ROLLBACK')
        res.status(400).send({message:'Insertion was not successful'})
    }
})

app.get('/skolenia', async (req, res, next) => {
    const testData = await pool.query('Select * from skolenia')
    data = JSON.parse(JSON.stringify(testData.rows, replacer));
    res.send(data);
})

app.get('/skoleniebyid', async (req, res, next) => {
    const id = req.body.id
    const testData = await pool.query('Select * FROM skolenia WHERE id=$1', [id])
    data = JSON.parse(JSON.stringify(testData.rows, replacer));
    res.status(200).send(data);
})

app.delete('/zmazskolenie', async (req, res)=> {
    const id = req.body.id
    try {
        await pool.query('DELETE FROM skolenia WHERE id=$1', [id])
        res.status(200).send({message:'DELETE was successful'})
    }catch (e){
        res.status(400).send({message:'DELETE was not successful'})
    }
})

app.post('/pridajskolenie', async (req, res)=> {
    const skolenie = JSON.parse(JSON.stringify(req.body, reversedReplacer));
    try{
        await pool.query('BEGIN')
        const ob = await pool.query('Select * from oblast WHERE oblast=$1',[skolenie.oblast])
        if (ob.rowCount === 0){
            await pool.query(`insert into oblast(oblast) values($1)`,[skolenie.oblast])
        }
        const queryText = 'INSERT INTO skolenia(kod_skolenia, nazov, dlzka_platnosti, oblast, popis) VALUES($1, $2, $3, $4, $5)'
        await pool.query(queryText, [skolenie.kod_skolenia, skolenie.nazov, skolenie.dlzka_platnosti, skolenie.oblast, skolenie.popis])
        await pool.query('COMMIT')
        res.status(200).send({message:'Insertion was successful'})
    }
    catch (e) {
        await pool.query('ROLLBACK')
        res.status(400).send({message:'Insertion was not successful'})
    }
})

app.put('/upravskolenie', async (req, res)=> {
    const id = req.body.id
    const skolenie = JSON.parse(JSON.stringify(req.body, reversedReplacer));
    try {
        await pool.query('BEGIN')
        const ob = await pool.query('Select * from oblast WHERE oblast=$1',[skolenie.oblast])
        if (ob.rowCount === 0){
            await pool.query(`insert into oblast(oblast) values($1)`,[skolenie.oblast])
        }
        const queryText = 'UPDATE skolenia SET kod_skolenia=$1, nazov=$2, dlzka_platnosti=$3, oblast=$4, popis=$5 WHERE id=$6'
        await pool.query(queryText, [skolenie.kod_skolenia, skolenie.nazov, skolenie.dlzka_platnosti, skolenie.oblast, skolenie.popis, id])
        await pool.query('COMMIT')
        res.status(200).send({message:'UPDATE was successful'})
    }catch (e){
        await pool.query('ROLLBACK')
        res.status(400).send({message:'UPDATE was not successful' + e.message})
    }
})

function skolenieParser(skolenia) {
    const idcka = new Set()
    for (let i = 0; i < skolenia.length; i++) {

        idcka.add(skolenia[i].id)
    }

    let final = []
    idcka.forEach(id => {
        const z = skolenia.filter(function (entry){
            return entry.id===id
        })
        var j = {}
        j["id"] = z[0].id
        j["meno"] = z[0].meno
        j["priezvisko"] = z[0].priezvisko
        j["oblast"] = z[0].oblast
        for (let i = 0; i < z.length; i++) {
            j[z[i].kod_skolenia] = z[i].datum_absolvovania
        }
        final.push(j)
    })
    return final
}

app.get('/vsetkyskolenia', async (req, res, next) => {
    const testData = await pool.query('SELECT zamestnanci.id, datum_absolvovania, meno, priezvisko, zamestnanci.oblast ,kod_skolenia FROM zamestnanci_skolenia LEFT JOIN zamestnanci ON zamestnanci_skolenia.id_zamestnanca = zamestnanci.id LEFT JOIN skolenia ON skolenia.id = zamestnanci_skolenia.id_skolenia')
    data = skolenieParser(testData.rows)
    newdata = JSON.parse(JSON.stringify(data, replacer));
    res.status(200).send(newdata);
})

app.get('/konciaceskolenia', async (req, res, next) => {
    const testData = await pool.query('SELECT zamestnanci.id as id_zamestnanca, datum_absolvovania, meno, priezvisko, karticka, zamestnanci.oblast , kod_skolenia, skolenia.id as id_skolenia ,(datum_absolvovania + interval \'1 month\' * dlzka_platnosti) AS koniec_platnosti, dlzka_platnosti FROM zamestnanci_skolenia LEFT JOIN zamestnanci ON zamestnanci_skolenia.id_zamestnanca = zamestnanci.id LEFT JOIN skolenia ON skolenia.id = zamestnanci_skolenia.id_skolenia WHERE (datum_absolvovania + interval \'1 month\' * (dlzka_platnosti - 2)) < now()')
    newdata = JSON.parse(JSON.stringify(testData.rows, replacer));
    res.status(200).send(newdata);
})

app.post('/pridajskoleniezamestnancom',async (req, res)=> {
    const id_zamestnancov = req.body.id_zamestnancov
    const id_skolenia = req.body.id_skolenia
    const datum = req.body.datum_absolvovania
    try{
        const queryText = 'INSERT INTO zamestnanci_skolenia(id_zamestnanca, id_skolenia, datum_absolvovania) VALUES($1, $2, $3)'
        for (const id_zamestnanca of id_zamestnancov) {
            await pool.query('BEGIN')
            pool.query(queryText, [id_zamestnanca, id_skolenia, datum])
            await pool.query('COMMIT')
        }
        res.status(200).send({message:'Insertion was successful'})
    }
    catch (e) {
        await pool.query('ROLLBACK')
        res.status(400).send({message:'Insertion was not successful'})
    }
})

app.put('/upravskoleniezamestnancovi', async (req, res)=> {
    const id_zamestnanca = req.body.id_zamestnanca
    const id_skolenia = req.body.id_skolenia
    const skolenie = JSON.parse(JSON.stringify(req.body, reversedReplacer));
    const datum = skolenie.datum
    try {
        const queryText = 'UPDATE zamestnanci_skolenia SET datum_absolvovania=$1 WHERE id_zamestnanca=$2 AND id_skolenia=$3'
        await pool.query(queryText, [datum, id_zamestnanca, id_skolenia])
        res.status(200).send({message:'UPDATE was successful'})
    }catch (e){
        res.status(400).send({message:'UPDATE was not successful' + e.message})
    }
})

// Require the Routes API  
// Create a Server and run it on the port 9000
const server = app.listen(9000, function () {
    let host = server.address().address
    let port = server.address().port
    console.log ('Listen on port 9000');

    // Starting the Server at the port 9000
})
