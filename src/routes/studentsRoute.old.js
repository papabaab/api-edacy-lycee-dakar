const express = require('express')
const router = express.Router()

const db = require('../static/db')
const paramsRoutes = require('./studentsParams')


router.get("/:id", (req, res) => {

    const id = req.params.id
    db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.log('errors: ', err)
            return
        }

        console.log("USER FROM DB: ", row)
        res.send(row)
    })
})

function callBackGetStudents(req, res, rows){

    var students=[]
      rows.forEach((row) => {
          students.push({
              id: row.id,
              firstname: row.firstname,
              lastname: row.lastname,
              username: row.username,
              password: row.password,
              email: row.email
          })
      })
      console.log('STUDENTS FROM DB: ', students)
      const contenu = students
      const contenuJson = JSON.stringify(contenu)
      res.set('Content-Type', "application/json")
      res.set('Server', 'NodeJS')
      res.status(201).send(contenuJson)
  }

router.get('/', async (req, res) => {
  
    db.all('SELECT * FROM students', (err, rows) => {
        if (err) {
            console.log('errors: ', err)
            return
        }
        callBackGetStudents(req, res, rows)
    })
    

})

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    const studentsJson = req.body

    const statement = db.prepare('INSERT INTO students (firstname, lastname, username, password, email) VALUES (?, ?, ?, ?, ?)')
    statement.run(studentsJson.firstname, studentsJson.lastname, studentsJson.username, studentsJson.password, studentsJson.email)
    statement.finalize()


    res.set('Content-Type', "application/json")
    res.set('Server', 'NodeJS')
    res.status(201).send(studentsJson)

})




router.use('/:id/params', paramsRoutes)









module.exports = router