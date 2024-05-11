import { CourseController } from '../controllers/courses-controller';
import express, { Router } from "express";
import { StudentRoutes } from './student.route';

// const coursesController = require("../controllers/courses-controller")



export class CourseRoutes {
courseController: CourseController
studentRoutes!: StudentRoutes
public router: Router
    constructor(){
        this.router = express.Router()
        this.courseController = new CourseController()
        this.studentRoutes = new StudentRoutes()
        this.configureRoutes()
    }

private configureRoutes(){
    this.router.use('/', this.studentRoutes.router.bind(this.studentRoutes))
        this.router.get('/', this.courseController.getAll.bind(this.courseController))
        this.router.post('/', this.courseController.create.bind(this.courseController))
        this.router.get('/:courseId', this.courseController.getById.bind(this.courseController))
        this.router.put('/:courseId', this.courseController.update.bind(this.courseController))
        this.router.delete('/:courseId', this.courseController.delete.bind(this.courseController))
}

}
