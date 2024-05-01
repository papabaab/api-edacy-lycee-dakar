const express = require("express");

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





app.listen(3000)

console.log('Server listening on port 3000')