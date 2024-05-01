const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('lycee-dakar.db')
db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        username TEXT,
        password TEXT,
        email TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)
})


module.exports = db