import AppDataSource from '../data-source'
import { Student } from '../models/student.model'


export class StudentDataSource {
   

    constructor(){
    }


    getStudentById(studentId: string|number): Promise<Student|null> {  
        return AppDataSource.manager.findOneBy(Student, {studentId: studentId})
    }

    getAllStudents(): Promise<Student[]> {
        return AppDataSource.manager.find(Student)
    }

     async studentAlreadyExists(username: string): Promise<boolean> {
        const student: Student|null = await AppDataSource.manager.findOneBy(Student, {username: username})
       return new Promise((resolve) => {
            if(student) resolve(true)
            else resolve(false)
        })
    }


    deleteStudent(studentId: string | number): Promise<any> {
        return AppDataSource.manager.delete(Student, {studentId: studentId})

    }


    async insertNewStudent(student: Student): Promise<Student> {
        const newStudent:Student =  await AppDataSource.manager.save(Student, student)
        console.log("DATABASE: created Student: ", newStudent)
        return newStudent
    }

    async updateStudent(studentId: string | number, student: Student): Promise<Student[] | undefined> {
        try{
        await AppDataSource.manager.update(Student, {studentId: studentId}, student)
        return AppDataSource.manager.findBy(Student, {studentId: studentId})
    }
    catch(err){console.error(err)}

    }

}
