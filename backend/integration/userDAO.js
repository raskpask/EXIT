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
	console.log(rows[0]); //[ {val: 1}, meta: ... ]
	// const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    

  } catch (err) {
	console.error(err);
  } finally {
	if (conn) return conn.end();
  }
}
/**
 * Regisers a user to the DB.
 *
 * @param {user} user - Instance of user
 * @returns Promise with 200
 */
function registerUser(user) {
    return new Promise(function (resolve, reject) {
        const client = connect();
        const query = {
            text: "INSERT INTO person (user_type_id,kth_email,alt_email,first_name,last_name,kth_username) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            values: [user.user_type_id,user.kth_email,user.alt_email,user.first_name,user.last_name,user.kth_username]
        }
        client
        .query(query)
        .then(res=>{//., (err, res) => {
            if (notVaildResponse(res)) {
                client.end()
                reject(new Error(dbError.errorCodes.INSERTING_USER_ERROR.code))
            } else if (res.rows[0].username == user.username) {
                client.end()
                resolve(200)
            }
            client.end()
            reject(new Error(dbError.errorCodes.USER_ERROR.code))
        })
        .catch(err=>{
            if (err) {
                if (err.code === '23505') {
                    reject(new Error(dbError.errorCodes.DUPLICATE_USER_ERROR.code))
                }
            }
        });
    });
}
/**
 * Fetches a user from the DB. It uses the unique user_id assigned to each user
 *
 * @param {int} user_id - Authorization token 
 * @returns Instance of user.
 */
function getUser(user_id) {
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT * FROM User WHERE user_id=$1",
            values: [user_id]
        }
        client
        .query(getUserQuery)
        .then(res=>{//, (err, res) => {
                if (notVaildResponse(res)) {
                    client.end();
                    reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                }
                if (res.rows != undefined) {
                    const rawUser = res.rows[0].person.split('(')[1].split(',');
                    client.end()
                    resolve(new User(rawUser[0], rawUser[1], rawUser[2], rawUser[3], rawUser[4], rawUser[5], user_id));
                }
        })
        .catch(err=>{
            client.end()
            reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
        });
    });
}

/**
 * Gets the KTH username of a user using their database ID.
 * @param {int} user_id the database id of the user
 * @returns The username of the user
 */
function get_username(user_id){
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT kth_username FROM User WHERE user_id=$1",
            values: [user_id]
        }
        client
        .query(getUserQuery)
        .then(res=>{//, (err, res) => {
                if (notVaildResponse(res)) {
                    client.end();
                    reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                }
                if (res.rows != undefined) {
                    //const rawUser = res.rows[0].person.split('(')[1].split(',');
                    client.end()
                    resolve(res.rows[0]);
                }
        })
        .catch(err=>{
            client.end()
            reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
        });
    });
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