var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser');
var mySQLDAO = require('./mySQLDAO')
var app = express()

app.set('view engine', 'ejs')


//Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

//connections in express
app.get('/', (req, res) => {
    mySQLDAO.getStudents()
        .then((data) => {
            res.render('getStudents', { 'data': data })
        })
        .catch((error) => { res.send(error) })
})

app.get('/students/delete/:sid', (req, res) => {
    //delete element from the list
    mySQLDAO.deleteStudent(req.params.sid)
        .then((data) => {
            //update list
            res.redirect('/')
        })
        .catch((error) => { res.send("<h1>Can't delete SID: "+req.params.sid+ ", he/she is doing a course</h1>") })


})

app.listen(3000, () => {
    console.log("Application Listening on port 3000")
})