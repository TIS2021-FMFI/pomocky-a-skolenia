const express = require('express');
const bodyParser = require('body-parser');
const database = require("./database/queries.js");
const config = require("./config.json");
const auth = require("./middleware/auth");
const cron = require('node-cron');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/oblasti',auth ,database.oblasti.getAll)
app.post('/pridajoblasti',auth ,database.oblasti.add)

app.get('/zamestnanci', auth, database.zamestnanci.getAll)
app.get('/zamestnanecbyid', auth, database.zamestnanci.getByID)
app.get('/pozicie',auth, database.zamestnanci.getAllpoz)
app.put('/upravzamestnanca', auth, database.zamestnanci.updateUser)
app.delete('/zmazzamestnanca', auth, database.zamestnanci.deleteUser)
app.post('/pridajzamestnanca', auth, database.zamestnanci.addUser)

app.get('/skolenia', auth, database.skolenia.getAll)
app.get('/skoleniebyid', auth, database.skolenia.getByID)
app.post('/pridajskolenie', auth, database.skolenia.addSkolenie)
app.put('/upravskolenie', auth, database.skolenia.updateSkolenie)
app.get('/vsetkyskolenia', auth, database.skolenia.getAllSkolenia)
app.get('/konciaceskolenia', auth, database.skolenia.endingSkolenia)
app.post('/pridajskoleniezamestnancom', auth, database.skolenia.addSkolenieZamest)
app.post('/upravskoleniezamestnancovi', auth, database.skolenia.updateSkolenieZam)

app.put('/addoblasti', auth, database.user.addOblast)
app.post("/register", auth, database.user.register)
app.put('/upravheslo', auth, database.user.updatePasswd)
app.post("/login", database.user.login)
app.post('/resetheslo', database.user.resetPasswd)


app.get("/welcome", auth, (req, res) => {
    console.log(req.user);
    res.status(200).send("Welcome <3");
});



app.listen(config["API_PORT"], function () {
    // let host = server.address().address
    // let port = server.address().port
    console.log ('Listen on port 9000');
    // cron.schedule('* * * * *', function() {
    //     database.user.notify().then();
    //     console.log('running a task every minute');
    // });
    //3 den v mesiaci
    // cron.schedule('0 0 3 * *', function() {
    //     database.user.notify().then();
    //     console.log('running a task every minute');
    // });
})
