const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");


app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/static/:file', (req, res) => {
    console.log("VALUE OFA PARAMS: ", req.params)
    console.log("VALUE OFA BODY: ", req.body)
    console.log("VALUE OFA QUERY: ", req.query)
    console.log("VALUE OFA HEADERS: ", req.headers)
    res.sendFile(path.join(__dirname, 'static', req.params.file))
})




app.get('/', (req, res) => {
  
    const contenuJson = {
        message: 'Hello World!'
    }
    res.set('Content-Type', "application/json")
    res.set('Server', 'NodeJS')
    res.status(201).send(contenuJson)

})


app.listen(3000)

console.log('Server listening on port 3000')