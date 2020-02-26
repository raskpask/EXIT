const mariadb = require('mariadb');

mariadb.createConnection({ host: 'localhost', user: 'root', password: 'EXITEXIT' })
    .then(conn => {
        conn.query("CREATE DATABASE exitdb")
            .then(rows => {
                console.log(rows);
                console.log("It works!")
                conn.end();
            })
            .catch(err => {
                //handle query error
            });
    })
    .catch(err => {
        //handle connection error
    });

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
        password: "EXITEXIT",
        insecureAuth: true
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