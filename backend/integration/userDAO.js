const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'EXITEXIT',
     database: 'exit_db',
     connectionLimit: 5
});
asyncFunction();
async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT * FROM User");
	console.log(rows); //[ {val: 1}, meta: ... ]
	// const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    

  } catch (err) {
	console.error(err);
  } finally {
	if (conn) return conn.end();
  }
}
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