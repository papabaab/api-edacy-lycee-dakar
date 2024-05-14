
import { Course } from '../models/course.model'
import appDataSource from '../data-source'
import { ObjectId } from 'typeorm'
// import { ObjectId } from 'typeorm'


export class CourseDataSource {
   
repo = appDataSource.getMongoRepository(Course)
    constructor(){

    }


    getCourseById(courseId: string|number): Promise<Course|null> {  
        // return appDataSource.manager.findOneBy(Course, {courseId: courseId})
        return this.repo.findOneBy(courseId)
    }


    
    getAllCourses(): Promise<Course[]> {
        // return appDataSource.manager.find(Course)
        return this.repo.find()
    }

     async courseAlreadyExists(courseTitle: string): Promise<boolean> {
        const course: Course|null = await appDataSource.manager.findOne(Course,{where: { courseTitle: courseTitle }})
       return new Promise((resolve) => {
            if(course) resolve(true)
            else resolve(false)
        })
    }


    deleteCourse(courseId: string | number): Promise<any> {
        // return appDataSource.manager.delete(Course, {courseId: courseId})
        return this.repo.delete(courseId)

    }


    async insertNewCourse(course: Course): Promise<Course> {
        const newCourse:Course =  await appDataSource.manager.save(Course, course)
        console.log("DATABASE: created Course: ", newCourse)
        return newCourse
    }

    async updateCourse(courseId: string | number, course: Course): Promise<Course | null> {
        try{
        // await appDataSource.manager.update(Course, {courseId: courseId}, course)
        await this.repo.update(courseId, course)
        return this.repo.findOneBy(courseId)
    }
    catch(err){
        console.error(err)
        return null
    }

    }

}
