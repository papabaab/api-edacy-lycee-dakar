import { Student } from './../models/student.model';
import { StudentsService } from './../services/user-service';
import { Request, Response } from "express"
// const studentService = require('../services/user-service')




export class StudentController  {

    private studentService: StudentsService
    constructor(){
        this.studentService = new StudentsService()
    }


    async getAll (req:Request, res:Response){
    const students: Student[] = await this.studentService.getAll()
    console.log("CONTROLLER: all students in db ", students)
    res.json(students)
}


    async getById (req:Request, res:Response) {
    const student: Student = await this.studentService.getById(req.params.id) as Student
    console.log("CONTROLLER: get student by id ", student)
    res.json(student)
}


async create (req:Request, res:Response){

    const {firstname, lastname, username, password, email} = req.body
    const newStudent: Student = req.body;
    console.log("CONTROLLER: student to be created ", newStudent)
    try{


    if(await this.studentService.alreadyExists(username)){
        res.json({message: 'User already exists'}).status(400)
        return
    } else if (firstname == '' || lastname == '' || username == '' || password == '' || email == ''
    || firstname == null || lastname == null || username == null || password == null || email == null
    || firstname == undefined || lastname == undefined || username == undefined || password == undefined || email == undefined) {
        
        res.json({message: 'CONTENT OR PARAMS MISSING'}).status(400)
        return
    }
    const student: Student|undefined = await this.studentService.create(newStudent)
    res.json({message: 'Student created', student: student}).status(201)
}
    catch(err){res.json({message: 'ERROR'}).status(500)}
}


    async update (req:Request, res:Response) {
    const studentId = req.params.id
    const student = req.body
    console.log("CONTROLLER: student to be updated ", studentId, student)
    try{
     const studentUpdated = await this.studentService.update(studentId, student)
     console.log('CONTROLLER: student updated: ', studentUpdated)
     res.json({message: 'User updated', studentUpdated: studentUpdated}).status(201)
    }
    catch(err){res.json({message: 'ERROR'}).status(500)}
}


    async delete (req:Request, res:Response) {
        try{
    const id = req.params.id
   await  this.studentService.delete(id)
    res.sendStatus(204).json({message: 'User deleted'})
        }
        catch(err){res.json({message: 'ERROR'}).status(500)}
}


}