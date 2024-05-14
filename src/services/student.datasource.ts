import { ObjectId } from 'typeorm'
import appDataSource from '../data-source'
import { Student } from '../models/student.model'


export class StudentDataSource {
   
repo = appDataSource.getMongoRepository(Student)
    constructor(){
    }


    getStudentById(studentId: string|number): Promise<Student|null> {  
        // return appDataSource.manager.findOne(Student,{where: {studentId: new ObjectId(studentId)}})
        return this.repo.findOneBy(studentId)
    }

    getAllStudents(courseId?: number|string): Promise<Student[]> {
        
        if(courseId) return appDataSource.manager.find(Student, {where: {courseId: courseId}})
        return appDataSource.manager.find(Student)
    }

     async studentAlreadyExists(username: string): Promise<boolean> {
        const student: Student|null = await appDataSource.manager.findOne(Student, {where: {username: username}})
       return new Promise((resolve) => {
            if(student) resolve(true)
            else resolve(false)
        })
    }


    deleteStudent(studentId: string | number): Promise<any> {
        // return appDataSource.manager.delete(Student, {studentId: studentId})
        return this.repo.delete(studentId)

    }


    async insertNewStudent(student: Student): Promise<Student> {
        const newStudent:Student =  await appDataSource.manager.save(Student, student)
        console.log("DATABASE: created Student: ", newStudent)
        return newStudent
    }

    async updateStudent(studentId: string | number, student: Student): Promise<Student | null> {
        try{
        // await appDataSource.manager.update(Student, {studentId: studentId}, student)
        await this.repo.update(studentId, student)
        // return appDataSource.manager.findBy(Student, {studentId: new ObjectId(studentId)})
        return this.repo.findOneBy(studentId)
    }
    catch(err){
        console.error(err)
        return null
    }

    }

}
