// const sqlite3 = require('sqlite3').verbose()
// import sqlite3 from 'sqlite3'
import { Student } from '../models/student.model'
import { AppDataSource } from '../data-source'


export class AppDatabase {
   
//    db : sqlite3.Database 

    constructor(){
        // this.db = new sqlite3.Database(process.env.SQLITE_DB || '../../lycee-dakar.db', (err) => {
        //     if (err) {
        //         console.error(err.message)
        //         return
        //     }
        //     this.createTable()
        //     console.log('Connected to the SQLite database.')
        // })
        AppDataSource.initialize().then(async () => {

            // const user = new Student()
            // user.firstname = "FirstUser"
            // user.lastname = "FirstLastName"
            // user.username = "test"
            // user.email= "test@gmail.com"
            // user.password = "test"
            // await AppDataSource.manager.save(user)
        
            console.log("Loading users from the database...")
            const users = await AppDataSource.manager.find(Student)
            console.log("Loaded users: ", users)
            console.log("Here you can setup and run express / fastify / any other framework.")
        
        }).catch(error => console.log(error))
    }


// private createTable(){

//     this.db.run(`CREATE TABLE IF NOT EXISTS students (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         firstname TEXT,
//         lastname TEXT,
//         username TEXT,
//         password TEXT,
//         email TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )`, (err) => {
//         if (err) {
//             console.error(err.message)
//             return
//         }
//         console.log('Table created')
//     })

// }



// private query(sql: string, params: any[] = []) : Promise<any> {
//     return new Promise((resolve, reject) => {
//         this.db.all(sql, params, (err, rows) => {
//             if (err) {
//                 console.log('errors: ', err)
//                 reject(err)
//                 return
//             }
//             resolve(rows)
//         })
//     })

// }

    getById(id: string|number): Promise<Student|null> {  
        // return this.query(`SELECT * FROM students WHERE id = ?`, [id]) as Promise<Student[]>
        return AppDataSource.manager.findOneBy(Student, {id: id})
    }

    getAll(): Promise<Student[]> {
        // return this.query(`SELECT * FROM students`) as Promise<Student[]>
        return AppDataSource.manager.find(Student)
    }


    async alreadyExists(username: string): Promise<boolean> {
        // const student: Student[]  = await this.query(`SELECT * FROM students WHERE username = ?`, [username])
        const student: Student|null = await AppDataSource.manager.findOneBy(Student, {username: username})
       return new Promise((resolve) => {
            if(student) resolve(true)
            else resolve(false)
        })
    }


    deleteStudent(id: string | number): Promise<any> {
        // return this.query(`DELETE FROM students WHERE id = ?`, [id])
        return AppDataSource.manager.delete(Student, {id: id})

    }


    async create(student: Student): Promise<Student> {
        // await this.query(`INSERT INTO students
        // (firstname, lastname, username, password, email)
        // VALUES
        // (?,?,?,?,?)`, [student.firstname, student.lastname, student.username, student.password, student.email])
        // return this.query(`SELECT * FROM students WHERE username = ?`, [student.username]) as Promise<Student[]>
        const newStudent:Student =  await AppDataSource.manager.save(Student, student)
        console.log("DATABASE: created Student: ", newStudent)
        return newStudent
    }

    async update(id: string | number, student: Student): Promise<Student[] | undefined> {
        try{

        // await this.query(`UPDATE students
        // SET
        // firstname = ?,
        // lastname = ?,
        // username = ?,
        // password = ?,
        // email = ?
        // WHERE id = ?`, [student.firstname, student.lastname, student.username, student.password, student.email, id])

        await AppDataSource.manager.update(Student, {id: id}, student)
        // return this.query(`SELECT * FROM students WHERE id = ?`, [id]) as Promise<Student[]>
        return AppDataSource.manager.findBy(Student, {id: id})
    }
    catch(err){
        console.error(err)
    }

    }

}
