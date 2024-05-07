import express from "express";
import bodyParser from "body-parser";
import { StudentRoutes }  from './routes/studentsRoute'// importing routers
const studentsRouter = new StudentRoutes()
// const bodyParser = require("body-parser");
require('dotenv').config()

const app = express()//instantiation of server app
app.use(bodyParser.urlencoded({ extended: true }))// body parser
app.use(bodyParser.json())
app.use('/students', studentsRouter.router)
app.use('/', studentsRouter.router)
app.listen(process.env.PORT || 3000 )
console.log('Server listening on port', process.env.PORT)