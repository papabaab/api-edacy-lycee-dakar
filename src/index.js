const express = require("express");
require('dotenv').config()
//instantiation of server app
const app = express();



// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// importing routers
const studentsRouter = require('./routes/studentsRoute')


// plugin routers to 
app.use('/students', studentsRouter)





app.listen(process.env.PORT || 3000 )

console.log('Server listening on port', process.env.PORT)