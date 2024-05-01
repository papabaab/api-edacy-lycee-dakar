import { Student } from "../models/student.model";

let data: Student[] = [];



export class StudentsService {



getAll  () {
    return data;
}


getById  (id: number|string) {
    return data.find(e=>e.id == id)
}


create (student: Student){
    const newStudent = {...student, id: Date.now().toString()}
    data.push(newStudent)
    return newStudent
}


alreadyExists  (username: string) {
    return data.find((e:Student)=>e.username == username)? true: false
}


delete  (id:string|number) {
    data = data.filter(e=>e.id !== id)
}


update  (id:string|number, student:Student) {
    const index = data.findIndex((e:Student)=>e.id == id)
    if(index != -1){
        data[index] = {...student, id}
    } else throw new Error('User not found')
}

}