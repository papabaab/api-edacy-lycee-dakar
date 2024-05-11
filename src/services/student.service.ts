
import { Student } from '../models/student.model';
import { StudentDataSource } from "./student.datasource";

// let data: Student[] = [];



export class StudentService {

db: StudentDataSource = new StudentDataSource()

    async getAll(courseId?: number): Promise<Student[]>  {
    // return data;
    const allStudents = await this.db.getAllStudents(courseId)
    console.log("SERVICE: all students in db: ", allStudents)
    return allStudents
}


    async getById  (id: number|string): Promise<Student | null|undefined> {
    // return data.find(e=>e.id == id)
    try {
    const student:Student|null = await this.db.getStudentById(id)
    return student
    } catch (error) {console.log(error)}

}


     async create (student: Student): Promise<Student | undefined> {
    // const newStudent = {...student, id: Date.now().toString()}
    // data.push(newStudent)
    // return newStudent
    const createdStudent: Student | null = await this.db.insertNewStudent(student) 
    console.log("SERVICE: created Student: ", createdStudent)
    return createdStudent? createdStudent: undefined
}



    async alreadyExists  (username: string) : Promise<boolean> {
    // return data.find((e:Student)=>e.username == username)? true: false
    const alreadyExists: boolean = await this.db.studentAlreadyExists(username)
    return alreadyExists
}


    async delete  (id:string|number) {
    // data = data.filter(e=>e.id !== id)
    const res = await this.db.deleteStudent(id)
    console.log('STUDENT DELETED', res)
    return res
    
}


    async update  (id:string|number, student:Student): Promise<Student|undefined> {
    // const index = data.findIndex((e:Student)=>e.id == id)
    // if(index != -1){
    //     data[index] = {...student, id}
    // } else throw new Error('User not found')    
    const result :Student[]|undefined = await this.db.updateStudent(id, student)
    console.log('STUDENT UPDATED: ', result)
    return result? result[0]: undefined
}

}