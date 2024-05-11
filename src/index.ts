import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { CourseRoutes }  from './routes/course.route'// importing routers
const coursesRouter = new CourseRoutes()

require('dotenv').config()

const app = express() //instantiation of server app
app.use(bodyParser.urlencoded({ extended: true })) // body parser
app.use(bodyParser.json())
app.use('/courses', coursesRouter.router)
app.listen(process.env.PORT || 3000 )
console.log('Server listening on port', process.env.PORT)