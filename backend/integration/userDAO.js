const mysql = require('mysql');
let con;
createdb();
function init() {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "rootroot",
        database: 'webshop'
    });

}
function createdb() {
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "EXIT"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log('connected to db');
    });

    con.query("CREATE DATABASE exitdb", (err, result) => {
        if (err) {
            if (err.code === ERROR_DATABASE_EXISTS) {
                console.log('Database exists.');

            } else {
                console.log('unknown error');
            }
        }
    });
}

module.exports = {
    init,
    createdb

}