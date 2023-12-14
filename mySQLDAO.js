var pmysql = require('promise-mysql')

var pool;

pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'studentdb4'
})
    .then(p => {
        pool = p
    })
    .catch(e => {
        console.log("pool error:" + e)
    })

var getStudents = function () {
    return new Promise((resolve, reject) => {
        pool.query('select * from student_table')
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

var deleteStudent = function (sid) {
    return new Promise((resolve, reject) => {
        var myQuery = {
            sql: 'DELETE from student_table where student_id=?',
            values: [sid]
        }
        pool.query(myQuery)
            .then((data) => {
                resolve(data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

module.exports = { getStudents, deleteStudent }

