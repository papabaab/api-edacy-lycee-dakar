import "reflect-metadata"
import { DataSource } from "typeorm"
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions"
import { Course } from "./models/course.model"
import { Student } from "./models/student.model"

// const appDataSource = new DataSource({
//     type: "sqlite",
//     database: "lycee-dakar",
//     synchronize: true,
//     logging: false,
//     entities: ["src/models/*.ts"],
//     migrations: [],
//     subscribers: [],
// const uri = "mongodb+srv://papaalbaab:7D8GHVRBOIaiyOGb@lyceedakarxl.mpyuj9z.mongodb.net/?retryWrites=true&w=majority&appName=lyceedakarxl";

// })
const mongoOptions: MongoConnectionOptions = {
    type: "mongodb",
    host: "localhost",
    port: 27017,
    url: "mongodb+srv://papaalbaab:7D8GHVRBOIaiyOGb@lyceedakarxl.mpyuj9z.mongodb.net/?retryWrites=true&w=majority&appName=lyceedakarxl",
    // username: "papaalbaab",
    // password: "7D8GHVRBOIaiyOGb",
    // database: "lycee-dakar",
    logging: true,
    entities: ["src/models/*.ts"],
    synchronize: true,
    migrations: [],
    subscribers: [],
}
const appDataSource = new DataSource(mongoOptions)

appDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!")
    // const courses = await appDataSource.manager.find(Course)
    // const students = await appDataSource.manager.find(Student)
    // console.log("Loading courses from the database...", courses)
    // console.log("Loading students from the database...", students)
}).catch(error => console.log(error))


export default appDataSource
