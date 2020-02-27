const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'EXITEXIT',
     database: 'exit_db',
     connectionLimit: 5
});
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
            text: "INSERT INTO person (user_type_id,kth_email,alt_email,first_name,last_name,kth_username,phone_number) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
            values: [user.user_type_id,user.kth_email,user.alt_email,user.first_name,user.last_name,user.kth_username,user.phone_number]
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
                    resolve(new User(rawUser[0], rawUser[1], rawUser[2], rawUser[3], rawUser[4], rawUser[5],rawUser[6], user_id));
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
function getUsername(user_id){
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
/**
 * Gets the database ID of the user using their userna,e.
 * @param {int} username the KTH username of the user
 * @returns The username of the user
 */
function getUserID(username){
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT user_id FROM User WHERE kth_username=$1",
            values: [username]
        }
        client
        .query(getUserQuery)
        .then(res=>{
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
/**
 * 
 * @param {int} project_id - The ID of the project
 */
function getProject(project_id){
    return new Promise(function (resolve, reject) {
        client = connect();
        const getUserQuery = {
            text: "SELECT * FROM Degree_project WHERE project_id=$1",
            values: [project_id]
        }
        client
        .query(getUserQuery)
        .then(res=>{//, (err, res) => {
                if (notVaildResponse(res)) {
                    client.end();
                    reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                }
                if (res.rows != undefined) {
                    const rawProject = res.rows[0].person.split('(')[1].split(',');
                    client.end()
                    resolve(new ProjectDetails(rawProject[0], rawProject[1], rawProject[2], rawProject[3], rawProject[4], rawProject[5],rawProject[6],rawProject[7],rawProject[8],rawProject[9],rawProject[10]));
                }
        })
        .catch(err=>{
            client.end()
            reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
        });
    });
}

module.exports = {
    registerUser,
    getUser,
    getUsername,
    getUserID

}