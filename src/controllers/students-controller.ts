import { StudentsService } from './../services/user-service';
import { Request, Response } from "express"
const studentService = new StudentsService()
// const studentService = require('../services/user-service')




export const studentsController = {


getAll (req:Request, res:Response){
    const data = studentService.getAll()
    res.json(data)
},


getById (req:Request, res:Response) {
    const data = studentService.getById(req.params.id)
    res.json(data)
},


create (req:Request, res:Response){


    console.log('student', req.body)
    const {firstname, lastname, username, password, email} = req.body
    const newStudent = req.body;
    if(studentService.alreadyExists(username)){
        res.json({message: 'User already exists'}).status(400)
        return
    } else if (firstname == '' || lastname == '' || username == '' || password == '' || email == ''
    || firstname == null || lastname == null || username == null || password == null || email == null
    || firstname == undefined || lastname == undefined || username == undefined || password == undefined || email == undefined) {
        
        res.json({message: 'CONTENT OR PARAMS MISSING'}).status(400)
        return
    }
    const data = studentService.create(newStudent)
    res.json('Student created'+ data).status(201)
},


update (req:Request, res:Response) {
    const studentId = req.params.id
    const student = req.body
     studentService.update(studentId, student)
     res.json('User updated').status(201)
},


delete (req:Request, res:Response) {
    const id = req.params.id
    studentService.delete(id)
    res.sendStatus(204)
}


}