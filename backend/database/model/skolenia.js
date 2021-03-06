const { pool } = require('../database')
const logger = require("../../middleware/logger");

const {
  replacer,
  reversedReplacer,
  skolenieParser,
  oblastiToList,
} = require('../../functions')

const getAll = async (request, response) => {
  await pool.query('SELECT * FROM skolenia', (error, results) => {
    let data
    if (error) {
      response.status(400).send(error.message, error.code)
    } else {
      data = JSON.parse(JSON.stringify(results.rows, replacer))
      var dataToSend = data.sort(function (a, b) {
        return a.oblast < b.oblast ? 1 : a.oblast > b.oblast ? -1 : 0
      })
      response.status(200).send(dataToSend)
    }
  })
}

const getByID = async (request, response) => {
  const id = request.body.id
  await pool.query(
    'SELECT * FROM skolenia WHERE id=$1',
    [id],
    (error, results) => {
      let data
      if (error) {
        response.status(400).send(error.message, error.code)
      } else {
        data = JSON.parse(JSON.stringify(results.rows, replacer))
        response.status(200).send(data)
      }
    }
  )
}

const addSkolenie = async (request, response) => {
  const user = request.user["user"]
  const { kod_skolenia, nazov, dlzka_platnosti, oblast, popis } = JSON.parse(
    JSON.stringify(request.body, reversedReplacer)
  )

  try {
    await pool.query('BEGIN')
    const ob = await pool.query('Select * from oblast WHERE oblast=$1', [
      oblast,
    ])
    if (ob.rowCount === 0) {
      await pool.query(`INSERT INTO oblast(oblast) values($1)`, [oblast])
    }
    const queryText =
      'INSERT INTO skolenia(kod_skolenia, nazov, dlzka_platnosti, oblast, popis) VALUES($1, $2, $3, $4, $5)'
    await pool.query(queryText, [
      kod_skolenia,
      nazov,
      dlzka_platnosti,
      oblast,
      popis,
    ])
    await pool.query('COMMIT')
    response.status(200).send({ message: 'Insertion was successful' })
    logger.info(`${user.email} pridal skolenie: ${kod_skolenia}`);
  } catch (error) {
    await pool.query('ROLLBACK')
    response.status(400).send({
      message: 'Insertion was not successful',
      'error code': error.code,
      error: error.message,
    })
  }
}

const updateSkolenie = async (request, response) => {
  const id = request.body.id
  const user = request.user["user"]
  const { kod_skolenia, nazov, dlzka_platnosti, oblast, popis } = JSON.parse(
    JSON.stringify(request.body, reversedReplacer)
  )
  try {
    await pool.query('BEGIN')
    let olduser = await pool.query('SELECT * FROM skolenia WHERE id=$1', [id]);
    const old = olduser.rows[0]

    const ob = await pool.query('SELECT * FROM oblast WHERE oblast=$1', [
      oblast,
    ])
    if (ob.rowCount === 0) {
      await pool.query(`insert into oblast(oblast) values($1)`, [oblast])
    }
    const queryText =
      'UPDATE skolenia SET kod_skolenia=$1, nazov=$2, dlzka_platnosti=$3, oblast=$4, popis=$5 WHERE id=$6'
    await pool.query(queryText, [
      kod_skolenia,
      nazov,
      dlzka_platnosti,
      oblast,
      popis,
      id,
    ])
    await pool.query('COMMIT')
    response.status(200).send({ message: 'UPDATE was successful' })
    logger.info(`${user.email} upravil skolenie: ${old.kod_skolenia} na ${kod_skolenia}`);
  } catch (error) {
    await pool.query('ROLLBACK')
    response.status(400).send({
      message: 'UPDATE was not successful',
      'error code': error.code,
      error: error.message,
    })
  }
}

const getAllSkolenia = async (request, response) => {
  const user = request.user['user']
  await pool.query(
    'SELECT zamestnanci.id, datum_absolvovania, meno, priezvisko, zamestnanci.oblast ,kod_skolenia FROM zamestnanci_skolenia LEFT JOIN zamestnanci ON zamestnanci_skolenia.id_zamestnanca = zamestnanci.id LEFT JOIN skolenia ON skolenia.id = zamestnanci_skolenia.id_skolenia',
    async (error, results) => {
      let list
      if (error) {
        response
          .status(400)
          .send({ 'error code': error.code, error: error.message })
      } else {
        let data = skolenieParser(results.rows)
        let dataToSend = JSON.parse(JSON.stringify(data, replacer))
        if (user.is_admin) {
          response.status(200).send(dataToSend)
        } else {
          const oblasti = await pool.query(
            'SELECT oblast FROM pouzivatelia_oblast LEFT JOIN pouzivatelia ON pouzivatelia.id = id_pouzivatela LEFT JOIN oblast ON oblast.id = id_oblast WHERE email = $1',
            [user.email]
          )
          list = oblastiToList(oblasti.rows)
          const dataToSend = data.filter(function (entry) {
            return list.includes(entry.oblast)
          })
          response.status(200).send(dataToSend)
        }
      }
    }
  )
}

const daysBetweenDates = (d1, d2) => {
  if (!d1 || !d2) return 0
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24))
}

const endingSkolenia = async (request, response) => {
  let list
  const user = request.user['user']

  await pool.query(
    "SELECT meno, priezvisko, kod_skolenia, zamestnanci.oblast, datum_absolvovania, (datum_absolvovania + interval '1 month' * dlzka_platnosti) AS koniec_platnosti, dlzka_platnosti FROM zamestnanci_skolenia LEFT JOIN zamestnanci ON zamestnanci_skolenia.id_zamestnanca = zamestnanci.id LEFT JOIN skolenia ON skolenia.id = zamestnanci_skolenia.id_skolenia WHERE (datum_absolvovania + interval '1 month' * (dlzka_platnosti - 2)) < now() AND dlzka_platnosti > 0",
    async (error, results) => {
      let dataToSend
      if (error) {
        response
          .status(400)
          .send({ 'error code': error.code, error: error.message })
      } else {
        dataToSend = JSON.parse(JSON.stringify(results.rows, replacer))
        dataToSend = dataToSend
          .map((r) => ({
            ...r,
            pocet_dni_platnosti: daysBetweenDates(
              new Date(Date.now()),
              new Date(r.koniec_platnosti)
            ),
          }))
          .filter((r) => r.pocet_dni_platnosti <= 62)
          .sort((a, b) => a.pocet_dni_platnosti - b.pocet_dni_platnosti)
        console.log(dataToSend.length)
        if (user.is_admin) {
          response.status(200).send(dataToSend)
        } else {
          const oblasti = await pool.query(
            'SELECT oblast FROM pouzivatelia_oblast LEFT JOIN pouzivatelia ON pouzivatelia.id = id_pouzivatela LEFT JOIN oblast ON oblast.id = id_oblast WHERE email = $1',
            [user.email]
          )
          list = oblastiToList(oblasti.rows)
          const readyData = dataToSend.filter(function (entry) {
            return list.includes(entry.oblast)
          })
          response.status(200).send(readyData)
        }
      }
    }
  )
}

const addSkolenieZamest = async (request, response) => {
  const { id_zamestnancov, id_skolenia, datum } = request.body
  const user = request.user["user"]
  let errorlog = []
  let queryText =
    'INSERT INTO zamestnanci_skolenia(id_zamestnanca, id_skolenia, datum_absolvovania) VALUES($1,$2,$3) ON conflict(id_zamestnanca, id_skolenia) DO update set datum_absolvovania=EXCLUDED.datum_absolvovania'
  for (const id_zamestnanca of id_zamestnancov) {
    try {
      await pool.query(queryText, [id_zamestnanca, id_skolenia, datum])
      let olduser = await pool.query('SELECT * FROM zamestnanci WHERE id=$1', [id_zamestnanca]);
      const old = olduser.rows[0]

      let oldskolenie = await pool.query('SELECT * FROM skolenia WHERE id=$1', [id_skolenia]);
      const olds = oldskolenie.rows[0]

      logger.info(`${user.email} pridal skolenie:${olds.kod_skolenia} -> ${old.meno} ${old.priezvisko}:${old.osobne_cislo} `);

    } catch (error) {
      errorlog.push(error)
    }
  }
  if (errorlog.length === 0) {
    response.status(200).send({ message: 'Insertion was successful' })

  } else {
    response
      .status(400)
      .send({ message: 'Insertion was not successful', errorlog })
  }
}

const updateSkolenieZam = async (request, response) => {
  const user = request.user["user"]
  const { id_zamestnanca, id_skolenia, datum } = JSON.parse(
    JSON.stringify(request.body, reversedReplacer)
  )
  try {
    const queryText =
      'UPDATE zamestnanci_skolenia SET datum_absolvovania=$1 WHERE id_zamestnanca=$2 AND id_skolenia=$3'
    await pool.query(queryText, [datum, id_zamestnanca, id_skolenia])
    let olduser = await pool.query('SELECT * FROM zamestnanci WHERE id=$1', [id_zamestnanca]);
    const old = olduser.rows[0]

    let oldskolenie = await pool.query('SELECT * FROM skolenia WHERE id=$1', [id_skolenia]);
    const olds = oldskolenie.rows[0]

    logger.info(`${user.email} upravil skolenie:${olds.kod_skolenia} na ${olds.kod_skolenia},${datum} -> ${old.meno} ${old.priezvisko}:${old.osobne_cislo}`);
    response.status(200).send({ message: 'UPDATE was successful' })
  } catch (error) {
    response.status(400).send({
      message: 'UPDATE was not successful',
      'error code': error.code,
      error: error.message,
    })
  }
}

module.exports = {
  getAll,
  getByID,
  addSkolenie,
  updateSkolenie,
  getAllSkolenia,
  endingSkolenia,
  addSkolenieZamest,
  updateSkolenieZam,
}

//zmazanie skolenia
// app.delete('/zmazskolenie', async (req, res)=> {
//     const id = req.body.id
//     try {
//         await pool.query('DELETE FROM skolenia WHERE id=$1', [id])
//         res.status(200).send({message:'DELETE was successful'})
//     }catch (e){
//         res.status(400).send({message:'DELETE was not successful'})
//     }
// })
