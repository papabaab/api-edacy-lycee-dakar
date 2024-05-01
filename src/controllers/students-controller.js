const userService = require('../services/user-service')

exports.getAll = (req, res)=>{
    const data = userService.getAll()
    res.json(data)
}


exports.getById = (req, res) => {
    const data = userService.getById(req.params.id)
    res.json(data)
}


exports.create = (req, res)=>{


    console.log('student', req.body)
    const {firstname, lastname, username, password, email} = req.body
    if(userService.alreadyExists(username)){
        res.json({message: 'User already exists'}).status(400)
        return
    } else if (firstname == '' || lastname == '' || username == '' || password == '' || email == ''
    || firstname == null || lastname == null || username == null || password == null || email == null
    || firstname == undefined || lastname == undefined || username == undefined || password == undefined || email == undefined) {
        
        res.json({message: 'CONTENT OR PARAMS MISSING'}).status(400)
        return
    }
    const data = userService.create(newStudent)
    res.json('Student created', data).status(201)
}


exports.update = (req, res) => {
    const studentId = req.params.id
    const student = req.body
     userService.update(studentId, student)
     res.json('User updated').status(201)
}


exports.delete = (req, res) => {
    const id = req.params.id
    userService.delete(id)
    res.sendStatus(204)
}