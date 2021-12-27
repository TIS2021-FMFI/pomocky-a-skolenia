// Entry Point of the API Server 
  
const express = require('express');
  
/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gefcotest',
    password: 'Data11',
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
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})
  
app.get('/testdata', (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('Select * from test')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

app.get('/oblasti', async (req, res, next) => {
    const testData = await pool.query('Select * from oblast')
    res.send(testData.rows);
})

app.post('/oblasti', (req, res)=> {
    const ob = req.body.oblast;
    let insertQuery = `insert into oblast(oblast) values('${ob}')`
    pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send({message:'Insertion was successful'})
        }
        else{ console.log(err.message);
            res.send(err.message)
        }
    })
})

app.get('/zamestnanci', async (req, res, next) => {
    const testData = await pool.query('Select * from zamestnanci')
    res.send(testData.rows);
})
  
// Require the Routes API  
// Create a Server and run it on the port 9000
const server = app.listen(9000, function () {
    let host = server.address().address
    let port = server.address().port
    console.log ('Listen on port 9000');

    // Starting the Server at the port 9000
})
