
import { Course } from '../models/course.model'
import AppDataSource from '../data-source'


export class CourseDataSource {
   

    constructor(){
    }


    getCourseById(courseId: string|number): Promise<Course|null> {  
        return AppDataSource.manager.findOneBy(Course, {courseId: courseId})
    }


    
    getAllCourses(): Promise<Course[]> {
        return AppDataSource.manager.find(Course)
    }

     async courseAlreadyExists(courseTitle: string): Promise<boolean> {
        const course: Course|null = await AppDataSource.manager.findOneBy(Course, {courseTitle: courseTitle})
       return new Promise((resolve) => {
            if(course) resolve(true)
            else resolve(false)
        })
    }


    deleteCourse(courseId: string | number): Promise<any> {
        return AppDataSource.manager.delete(Course, {courseId: courseId})

    }


    async insertNewCourse(course: Course): Promise<Course> {
        const newCourse:Course =  await AppDataSource.manager.save(Course, course)
        console.log("DATABASE: created Course: ", newCourse)
        return newCourse
    }

    async updateCourse(courseId: string | number, course: Course): Promise<Course[] | undefined> {
        try{
        await AppDataSource.manager.update(Course, {courseId: courseId}, course)
        return AppDataSource.manager.findBy(Course, {courseId: courseId})
    }
    catch(err){console.error(err)}

    }

}
