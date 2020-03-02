const mariadb = require('mariadb');
const User = require('../model/user');
const dbError = require('../error/dbErrors');
const ProjectDetails = require('../model/projectDetails');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'EXITEXIT',
    database: 'exit_db',
    connectionLimit: 5,
    multipleStatements: true
});
/**
 * Regisers a user to the DB.
 *
 * @param {user} user - Instance of user
 * @returns Promise with 200
 */
function registerUser(user) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const query = {
            text: "INSERT INTO person (user_type_id,kth_email,alt_email,first_name,last_name,kth_username,phone_number) VALUES(?,?,?,?,?,?)",
            values: [user.user_type_id, user.kth_email, user.alt_email, user.first_name, user.last_name, user.kth_username, user.phone_number]
        }
        client
            .query(query)
            .then(res => {//., (err, res) => {
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
            .catch(err => {
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
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const getUserQuery = {
            text: "SELECT * FROM User WHERE user_id=?",
            values: [user_id]
        }
        client
            .query(getUserQuery.text, getUserQuery.values)
            .then(res => {
                if (res == undefined) {
                    client.end();
                    reject(new Error(dbError.errorCodes.NO_USER_ERROR.code));
                }
                const rawUser = res[0];
                client.end()
                var foundUser = new User(rawUser.user_type_id, rawUser.kth_email, rawUser.alt_email, rawUser.first_name, rawUser.last_name, rawUser.kth_username, rawUser.phone_number, rawUser.user_id);
                resolve(foundUser);
            })
            .catch(err => {
                client.end()
                console.error(err);
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            });
    });
}

/**
 * Gets the KTH username of a user using their database ID.
 * @param {int} user_id the database id of the user
 * @returns The username of the user
 */
function getUsername(user_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const getUserQuery = {
            text: "SELECT kth_username FROM User WHERE user_id=?",
            values: [user_id]
        }
        client
            .query(getUserQuery.text, getUserQuery.values)
            .then(res => {//, (err, res) => {
                if (notVaildResponse(res)) {
                    client.end();
                    reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                }
                if (res !== undefined) {
                    //const rawUser = res.rows[0].person.split('(')[1].split(',');
                    client.end()
                    resolve(res[0].kth_username);
                }
            })
            .catch(err => {
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
function getUserID(username) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const getUserQuery = {
            text: "SELECT user_id FROM User WHERE kth_username=?",
            values: [username]
        }
        client
            .query(getUserQuery.text, getUserQuery.values)
            .then(res => {
                if (notVaildResponse(res)) {
                    client.end();
                    reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                }
                if (res != undefined) {
                    //const rawUser = res.rows[0].person.split('(')[1].split(',');
                    client.end()
                    resolve(res[0].user_id);
                }
            })
            .catch(err => {
                client.end()
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            });
    });
}
/**
 * Gets a project with all details from the database
 * @param {int} project_id - The ID of the project
 */
function getProject(user_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const getUserQuery = {
            text: "SELECT project_id, number_of_students, title, project_description,credits,start_date,end_date,in_progress,out_of_date,all_info_specified,company,company_contact,name,address,phone_number FROM (Degree_project LEFT JOIN Company ON Degree_project.company = Company.company_id) WHERE Degree_project.project_id IN (SELECT degree_project_id FROM Student_project WHERE user_id = ?)",
            values: [user_id]
        }
        client
            .query(getUserQuery.text, getUserQuery.values)
            .then(res => {//, (err, res) => {
                // if (notVaildResponse(res)) {
                //     client.end();
                //     reject(new Error(dbError.errorCodes.GET_USER_ERROR.code));
                // }
                if (res !== undefined) {
                    const rawProject = res[0]//.person.split('(')[1].split(',');
                    client.end()
                    let foundProject = new ProjectDetails(rawProject.project_id, rawProject.number_of_students, rawProject.title, rawProject.project_description, rawProject.credits, rawProject.start_date, rawProject.end_date, rawProject.in_progress, rawProject.out_of_date, rawProject.all_info_specified, rawProject.company, rawProject.company_contact, rawProject.name, rawProject.address, rawProject.phone_number);
                    resolve(foundProject);
                }
            })
            .catch(err => {
                client.end()
                console.error(err);
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            });
    });
}
/**
 * Adds a new project to the database. 
 * @param {projectDetails} project_details 
 */
function registerProject(project_details) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        try {
            await client.query("BEGIN");
            if (project_details.company_name !== null) {
                let addCompanyQuery = {
                    text: "INSERT INTO Company (name,address,phone_number) "
                        + "VALUES (?,?,?); SELECT LAST_INSERT_ID()",
                    values: [project_details.company_name, project_details.company_address, project_details.company_phone_number]
                }
                await client.query(addCompanyQuery.text, addCompanyQuery.values)
                    .then(res => {
                        project_details.company = Object.values(res[1][0])[0];
                    })
                    .catch(err => {
                        client.query("ROLLBACK");
                        console.error(err);
                        reject(err);
                    });
            }
            let addProjectDetailsQuery = {
                text: "INSERT INTO Degree_project (number_of_students,title,project_description,credits,start_date,end_date,in_progress,out_of_date,all_info_specified,company,company_contact)"
                    + "VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                values: [project_details.number_of_students, project_details.project_title, project_details.project_description, project_details.credits, project_details.start_date, project_details.end_date, project_details.in_progress, project_details.out_of_date, project_details.all_info_specified, project_details.company, project_details.company_contact]
            }
            await client.query(addProjectDetailsQuery.text, addProjectDetailsQuery.values);
            await client.query("COMMIT");
            resolve(200);

        } catch (e) {
            client.query("ROLLBACK");
            console.error(e);
            reject(e);
        } finally {
            client.release();
        }
    });
}
function getBudgetYear() {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let getBudgetYear = {
            text: "SELECT master_hours,bachleor_hours,total_tutoring_hours,factor_2,factor_3,factor_4,factor_5,factor_6 " +
                "FROM Budget_year"
        }
        client
            .query(getBudgetYear)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.error(err)

            })
        client.end()
    })
}

module.exports = {
    registerUser,
    getUser,
    getUsername,
    getUserID,
    getProject,
    registerProject,
    getBudgetYear
}