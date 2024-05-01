const express = require('express')
const paramRouter = express.Router()




paramRouter.get('/:id', async (req, res) => {
  
    console.log("ALL PARAMS OF STUDENT: ", req.params.id, res )
    res.send('ALL PARAMS OF STUDENT: ', req.params.id)

})

// paramRouter.post('/:id', (req, res) => {
//     console.log('req.body', req.body);
//     res.set('Content-Type', "application/json")
//     res.set('Server', 'NodeJS')
//     res.status(201).send(studentsJson)

// })






module.exports = paramRouter