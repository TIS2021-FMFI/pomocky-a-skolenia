// require json-2-csv module
const {converter} = require('json-2-csv');
const fs = require('fs');
const {getAll} = require("../database/model/zamestnanci");
const {pool} = require("../database/database");
const {replacer,} = require("../functions");


pool.query('SELECT * FROM zamestnanci', async (error, results) => {
    //const user = request.user["user"]
    let data;
    let list;
    if (error) {
        //response.status(400).send(error.message, error.code)
    } else {
        data = JSON.parse(JSON.stringify(results.rows, replacer));

        converter.json2csv(data, (err, csv) => {
            if (err) {
                throw err;
            }

            // print CSV string
            console.log(csv);
            fs.writeFileSync('todos.csv', csv);
        });
        //if (user.is_admin) {
            //response.status(200).send(data);
       // } else {
        //    const oblasti = await pool.query('SELECT oblast FROM pouzivatelia_oblast LEFT JOIN pouzivatelia ON pouzivatelia.id = id_pouzivatela LEFT JOIN oblast ON oblast.id = id_oblast WHERE email = $1', [user.email])
        //    list = oblastiToList(oblasti.rows)
        //    const dataToSend = data.filter(function (entry) {
       //         return list.includes(entry.oblast)
        //    });
        //    response.status(200).send(dataToSend);
        //}
    }
})

const todos = [
    {
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
    },
    {
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
    },
    {
        "id": 3,
        "title": "fugiat veniam minus",
        "completed": false
    }];

// convert JSON array to CSV string
// converter.json2csv(getData, (err, csv) => {
//     if (err) {
//         throw err;
//     }
//
//     // print CSV string
//     console.log(csv);
//     fs.writeFileSync('todos.csv', csv);
// });
