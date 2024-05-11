import { Course } from './../models/course.model';
import { CourseDataSource } from "./course.datasource";
import { StudentDataSource } from './student.datasource';


export class CourseService {

courseTable: CourseDataSource = new CourseDataSource()
studentTable: StudentDataSource = new StudentDataSource()


    async getAll(): Promise<Course[]>  {
    // return data;
    const allCourses: Course[] = await this.courseTable.getAllCourses()
    console.log("SERVICE: all courses in db: ", allCourses)
    return allCourses
}


    async getById  (courseId: number|string): Promise<Course | null|undefined> {
    try {
    const course: Course|null = await this.courseTable.getCourseById(courseId)
    return course
    } catch (error) {console.log(error)}

}


     async create (course: Course): Promise<Course | undefined> {
    const createdCourse: Course | null = await this.courseTable.insertNewCourse(course) 
    console.log("SERVICE: created Course: ", createdCourse)
    return createdCourse? createdCourse: undefined
}



    async alreadyExists  (username: string) : Promise<boolean> {
    const alreadyExists: boolean = await this.courseTable.courseAlreadyExists(username)
    return alreadyExists
}


    async delete  (courseId:string|number) {
    // data = data.filter(e=>e.courseId !== courseId)
    const res = await this.courseTable.deleteCourse(courseId)
    console.log('COURSE DELETED', res)
    return res
    
}


    async update  (courseId:string|number, course:Course): Promise<Course|undefined> {
    const result :Course[]|undefined = await this.courseTable.updateCourse(courseId, course)
    console.log('COURSE UPDATED: ', result)
    return result? result[0]: undefined
}

}
