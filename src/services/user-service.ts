import { Student } from './../models/student.model';
import { AppDatabase } from "./database";

// let data: Student[] = [];



export class StudentsService {

db: AppDatabase = new AppDatabase()

    async getAll(): Promise<Student[]>  {
    // return data;
    const allStudents = await this.db.getAll()
    console.log("SERVICE: all students in db: ", allStudents)
    return allStudents
}


    async getById  (id: number|string): Promise<Student | null|undefined> {
    // return data.find(e=>e.id == id)
    try {
    const student:Student|null = await this.db.getById(id)
    return student
    } catch (error) {console.log(error)}

}


     async create (student: Student): Promise<Student | undefined> {
    // const newStudent = {...student, id: Date.now().toString()}
    // data.push(newStudent)
    // return newStudent
    const createdStudent: Student | null = await this.db.create(student) 
    console.log("SERVICE: created Student: ", createdStudent)
    return createdStudent? createdStudent: undefined
}



    async alreadyExists  (username: string) : Promise<boolean> {
    // return data.find((e:Student)=>e.username == username)? true: false
    const alreadyExists: boolean = await this.db.alreadyExists(username)
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
    const result :Student[]|undefined = await this.db.update(id, student)
    console.log('USER UPDATED: ', result)
    return result? result[0]: undefined
}

}