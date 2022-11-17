const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const db = mysql.createConnection(config)
db.query(`INSERT INTO people(name) VALUES('Geraldo')`)

const persistName = (name) => {
    if (name) {
        db.query(`INSERT INTO people(name) VALUES('${name}')`)
    }
}

const createResponseNamesList = (names) => {
    let res = '<h1>Full Cycle</h1> <ul>'
    names.forEach(element => {
        res += `<li>${element.name}</li>`
    });
    res += '</ul>'

    return res
}

app.get('/', async (req,res) => {
    persistName(req.query.name)

    db.query('SELECT * FROM people', function (err, rows) {
        if (err) throw err
        res.send(createResponseNamesList(rows))
      })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})