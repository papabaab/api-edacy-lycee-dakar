import { StudentController } from './../controllers/students-controller';
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
this.router.get('/', this.studentsController.getAll.bind(this.studentsController))
this.router.post('/', this.studentsController.create.bind(this.studentsController))
this.router.get('/:id', this.studentsController.getById.bind(this.studentsController))
this.router.put('/:id', this.studentsController.update.bind(this.studentsController))
this.router.delete('/:id', this.studentsController.delete.bind(this.studentsController))
}

}
// export default router