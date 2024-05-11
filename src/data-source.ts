import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "./models/student.model"
import { Course } from "./models/course.model"

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "lycee-dakar",
    synchronize: true,
    logging: false,
    entities: ["src/models/*.ts"],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize().then(async () => {

    console.log("Loading users from the database...")
    // const students = await AppDataSource.manager.find(Student)
    // const courses = await AppDataSource.manager.find(Course)
    // console.log("Loaded students: ", students)
    // console.log("Loaded courses: ", courses)

}).catch(error => console.log(error))


export default AppDataSource
