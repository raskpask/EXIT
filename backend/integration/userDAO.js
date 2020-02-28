const mariadb = require('mariadb');
const User = require('../model/user');
const ProjectDetails = require('../model/projectDetails');
const pool = mariadb.createPool({
     host: 'localhost', 
     user:'root', 
     password: 'EXITEXIT',
     database: 'exit_db',
     connectionLimit: 5
});

async function startConnection(){
    return await pool.getConnection();
}
let client = startConnection();





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
            text: "INSERT INTO person (user_type_id,kth_email,alt_email,first_name,last_name,kth_username,phone_number) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;",
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
        //const client =await pool.getConnection();
        const getUserQuery = {
            text: "SELECT * FROM User WHERE user_id=$1;",
            values: [user_id]
        }
        console.log(client);
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
    return new Promise(async function (resolve, reject) {
        const client =await pool.getConnection();
        const getUserQuery = {
            text: "SELECT kth_username FROM User WHERE user_id=$1;",
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
    return new Promise(async function (resolve, reject) {
        const client =await pool.getConnection();
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
 * Gets a project with all details from the database
 * @param {int} project_id - The ID of the project
 */
function getProject(project_id){
    return new Promise(function (resolve, reject) {
       //const client = await pool.getConnection();
        const getUserQuery = {
            text: "SELECT (Degree_project.project_id, Degree_project.number_of_students, Degree_project.project_description,Degree_project.credits,Degree_project.start_date,Degree_project.end_date,Degree_project.in_progess,Degree_project.out_of_date,Degree_project.all_info_specified,Degree_project.company,Degree_project.company_contact,Company.name,Company.address,Company.phone_number)" 
            + "FROM (Degree_project LEFT JOIN Company ON Degree_project.company = company.company_id)"
            + "WHERE Degree_project.project_id=$1;",
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
                    resolve(new ProjectDetails(rawProject[0], rawProject[1], rawProject[2], rawProject[3], rawProject[4], rawProject[5],rawProject[6],rawProject[7],rawProject[8],rawProject[9],rawProject[10],rawProject[11],rawProject[12],rawProject[13]));
                }
        })
        .catch(err=>{
            client.end()
            reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
        });
    });
}
/**
 * Adds a new project to the database. 
 * @param {projectDetails} project_details 
 */
function registerProject(project_details){
    return new Promise(async function(resolve,reject){
        const client = await pool.getConnection()
        try {
            await client.query("BEGIN");
            if(project_details.company_name !== null){
                let addCompanyQuery = {
                    text: "INSERT INTO Company (name,address,phone_number) "
                    + "VALUES($1,$2,$3); SELECT LAST_INSERT_ID();",
                    values:[project_details.company_name,project_details.company_address,project_details.company_phone_number]
                }
                await client.query(addCompanyQuery)
                .then(res=> {
                    project_details.company = res.rows[0];
                })
                .catch(err=>{
                    client.query("ROLLBACK");
                    console.error(err);
                    reject(err);
                });
        }
            let addProjectDetailsQuery = {
                text: "INSERT INTO Degree_project (number_of_students,project_description,credits,start_date,end_date,in_progress,out_of_date,all_info_specified,company,company_contact)"
                + "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *;",
                values: [project_details.number_of_students,project_details.project_description,project_details.credits,project_details.start_date,project_details.end_date,project_details.in_progress,project_details.out_of_date,project_details.all_info_specified,project_details.company,project_details.company_contact]
            }
            await client.query(addProjectDetailsQuery);
            await client.query("COMMIT");
            resolve(200);

        }catch (e){
            client.query("ROLLBACK");
            console.error(e);
            reject(e);
        }finally {
            client.release();
        }
    });
}
getUser(1);
getProject(1);
//registerProject(new ProjectDetails(null,1,"testprojekt",15,"2020-01-05","2020-06-01",1,0,1,null,1,"testföretaget","test","1234565"));


module.exports = {
    registerUser,
    getUser,
    getUsername,
    getUserID,
    registerProject
}