import { Course } from '../models/course.model';
import { Request, Response } from "express"
import { CourseService } from '../services/course.service';




export class CourseController  {

    private courseService: CourseService
    constructor(){
        this.courseService = new CourseService()
    }


    async getAll (req:Request, res:Response){
    const courses: Course[] = await this.courseService.getAll()
    console.log("CONTROLLER: all courses in db ", courses)
    res.json(courses).status(200)
}


    async getById (req:Request, res:Response) {
    const course: Course = await this.courseService.getById(req.params.courseId) as Course
    console.log("CONTROLLER: get course by courseId ", course)
    res.json(course)
}


async create (req:Request, res:Response){

    const {startDate, endDate, courseTitle}:Course = req.body as Course
    const newCourse: Course = req.body;
    console.log("CONTROLLER: course to be created ", newCourse)
    try{

    if(await this.courseService.alreadyExists(courseTitle)){
        res.json({message: 'Course already exists'}).status(400)
        return
    } else if (courseTitle == ''                    || startDate == ''          || endDate == ''
            || courseTitle == null                  || startDate == null        || endDate == null
            || courseTitle == undefined             || startDate == undefined   || endDate == undefined) {
        
        res.json({message: 'CONTENT OR PARAMS MISSING'}).status(400)
        return
    }
    const course: Course|undefined = await this.courseService.create(newCourse)
    res.json({message: 'Course created', course: course}).status(201)
}
    catch(err){res.json({message: 'ERROR'}).status(500)}
}


    async update (req:Request, res:Response) {
    const courseId = req.params.courseId
    const course = req.body
    console.log("CONTROLLER: course to be updated ", courseId, course)
    try{
     const courseUpdated = await this.courseService.update(courseId, course)
     console.log('CONTROLLER: course updated: ', courseUpdated)
     res.json({message: 'Course updated', course: {...courseUpdated}}).status(201)
    }
    catch(err){res.json({message: 'ERROR'}).status(500)}
}


    async delete (req:Request, res:Response) {
        try{
            const courseId = req.params.courseId
            await  this.courseService.delete(courseId)
            res.json({message: 'Course deleted'})
        }
        catch(err){res.json({message: 'ERROR', error: err}).status(500)}
}


}