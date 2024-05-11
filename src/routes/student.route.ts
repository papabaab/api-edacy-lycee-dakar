import { StudentController } from '../controllers/students-controller';
import express, { Router } from "express";

// const studentsController = require("../controllers/students-controller")



export class StudentRoutes {
studentsController: StudentController
public router: Router
    constructor(){
        this.router = express.Router()
        this.studentsController = new StudentController()
        this.configureRoutes()
    }

private configureRoutes(){
    this.router.get('/:courseId/students',        this.studentsController.getAll.bind(this.studentsController))
    this.router.post('/:courseId/students',       this.studentsController.create.bind(this.studentsController))
    this.router.get('/:courseId/students/:studentId',     this.studentsController.getById.bind(this.studentsController))
    this.router.put('/:courseId/students/:studentId',     this.studentsController.update.bind(this.studentsController))
    // this.router.patch('/:courseId/students/:studentId',     this.studentsController.update.bind(this.studentsController))
    this.router.delete('/:courseId/students/:studentId',  this.studentsController.delete.bind(this.studentsController))
}

}
