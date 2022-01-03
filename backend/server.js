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
        const queryText = 'UPDATE zamestnanci SET priezvisko=$1, meno=$2, pozicia=$3, fa=$4, oblast=$5, karticka=$6, osobne_cislo=$7, kava=$8, vzv=$9, datum_vydania=$10, bufetka=$11, zfsatna=$12, zfskrinka=$13, winnex=$14 WHERE id=$15'
        await pool.query(queryText, [zamestnanec.priezvisko, zamestnanec.meno, zamestnanec.pozicia, zamestnanec.fa, zamestnanec.oblast, zamestnanec.karticka, zamestnanec.osobne_cislo, zamestnanec.kava, zamestnanec.vzv, zamestnanec.datum_vydania, zamestnanec.bufetka, zamestnanec.zfsatna, zamestnanec.zfskrinka, zamestnanec.winnex, id])
        res.status(200).send({message:'UPDATE was successful'})
    }catch (e){
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

// Require the Routes API  
// Create a Server and run it on the port 9000
const server = app.listen(9000, function () {
    let host = server.address().address
    let port = server.address().port
    console.log ('Listen on port 9000');

    // Starting the Server at the port 9000
})
