const mariadb = require('mariadb');
const User = require('../model/user');
const dbError = require('../error/dbErrors');
const ProjectDetails = require('../model/projectDetails');
const BudgetYear = require('../model/budgetYear.js');
const pool = mariadb.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: 5,
    multipleStatements: true
});
TYPE_ADMIN = 1;
TYPE_DIRECTOR_OF_STUDIES = 2;
TYPE_EXAMINER = 3;
TYPE_STUDENT = 4;
TYPE_COMPANT_CONTACT = 5;

ROLE_EXAMINER = 1;
ROLE_SUPERVISOR = 2;
ROLE_STUDENT = 3;

NO_EXPERTISE_YET_ID = 5;
CREDITS_BACHELOR = 15;
CREDITS_MASTER = 30;


/**
 * Registers a user to the DB.
 *
 * @param {user} user - Instance of user
 * @returns Promise with 200
 */
function registerUser(username, user_type_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const query = {
            text: "INSERT INTO User (user_type_id,email,kth_username) VALUES(?,?,?)",
            values: [user_type_id, username + '@kth.se', username]
        }
        client.query("BEGIN")
        client
            .query(query.text,query.values)
            .then(res => {
                if (user_type_id === 3) {
                    const setExpertiseQuery = {
                        text: "INSERT INTO Expertise (user_id,expertise_id) VALUES (?,?)",
                        values: [res.insertId, 5]
                    }
                    client
                        .query(setExpertiseQuery.text, setExpertiseQuery.values)
                        .then(res => {
                            client.query("COMMIT")
                            client.end()
                            resolve()
                        })
                        .catch(err => {
                            console.error(err)
                            reject(new Error(dbError.errorCodes.USER_ERROR.code))
                            client.query("ROLLBACK")
                        })
                } else {
                    client.query("COMMIT")
                    client.end()
                    resolve()
                }
            })
            .catch(err => {
                client.end()
                if (err.code === '23505') {
                    reject(new Error(dbError.errorCodes.DUPLICATE_USER_ERROR.code))
                } else if (err.code === 'ER_DUP_ENTRY') {
                    const updateUser = {
                        text: "UPDATE User SET user_type_id = ? WHERE kth_username = ?",
                        values: [user_type_id, username]
                    }
                    client
                        .query(updateUser.text, updateUser.values)
                        .then(res => {
                            client.query("COMMIT")
                            client.end()
                            resolve()
                        })
                        .catch(err => {
                            console.error(err)
                            reject(new Error(dbError.errorCodes.USER_ERROR.code))
                            client.query("ROLLBACK")
                        })
                } else {
                    console.error(err)
                    reject(new Error(dbError.errorCodes.USER_ERROR.code))
                    client.query("ROLLBACK")
                }
            });
        resolve()
    });
}
/**
 * Fetches a user from the DB. It uses the unique user_id assigned to each user
 *
 * @param {int} user_id - Authorization token 
 * @returns Instance of user.
 */
function getUser(user_id, user_type_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        let getUserQuery;
        if (user_type_id) {
            getUserQuery = {
                text: "SELECT user_type_id,email,first_name,last_name,kth_username,phone_number,user_id " +
                    "FROM User WHERE user_type_id = ?",
                values: [parseInt(user_type_id)]
            }
        } else {
            getUserQuery = {
                text: "SELECT * " +
                    "FROM User WHERE user_id = ?",
                values: [user_id]
            }
        }
        client
            .query(getUserQuery.text, getUserQuery.values)
            .then(res => {
                if (res == undefined) {
                    client.end();
                    reject(new Error(dbError.errorCodes.NO_USER_ERROR.code));
                }
                client.end()
                resolve(res);
                // const rawUser = res[0];
                // var foundUser = new User(rawUser.user_type_id, rawUser.email, rawUser.first_name, rawUser.last_name, rawUser.kth_username, rawUser.phone_number, rawUser.user_id);
            })
            .catch(err => {
                client.end()
                console.error(err);
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            });
    });
}
/**
 * Updates a user in the database
 * @param {*} user 
 */
function updateUser(user) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const query = {
            text: "UPDATE User SET user_type_id = ?,email= ?,first_name= ?,last_name = ?,kth_username = ?,phone_number = ? WHERE user_id = ?",
            values: [user.user_type_id, user.email, user.first_name, user.last_name, user.kth_username, user.phone_number, user.user_id]
        }
        client
            .query(query)
            .then(res => {//., (err, res) => {
                if (res.rows[0].username == user.username) {
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
 * Deletes the user from the database
 * @param {int} user_id 
 */
function deleteUser(user_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let deleteExpertise = {
            text: "DELETE FROM User " +
                "WHERE user_id = ? ",
            values: [user_id]
        }
        client
            .query(deleteExpertise.text, deleteExpertise.values)
            .then(res => {
                //if (res.affectedRows == 1) {
                resolve()
                //}
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}
/**
 * Gets a work year from the database
 */
function getWorkYear(user_id, year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const getWorkYearQuery = {
            text: "SELECT work_hours_examiner,work_hours_supervisor,available_hours_examiner,available_hours_supervisor " +
                "FROM Work_year " +
                "WHERE person_id=? AND year = ?",
            values: [user_id, year]
        }
        client
            .query(getWorkYearQuery.text, getWorkYearQuery.values)
            .then(res => {
                client.end()
                resolve({
                    work_year: {
                        work_hours_examiner: res[0].work_hours_examiner,
                        work_hours_supervisor: res[0].work_hours_supervisor,
                        available_hours_examiner: res[0].available_hours_examiner,
                        available_hours_supervisor: res[0].available_hours_supervisor
                    }
                });
            })
            .catch(err => {
                client.end()
                console.error(err);
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            });
    });
}
function postWorkYear(year, examiners) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        let postWorkYearQuery;
        examiners.forEach((examiner, i, arr) => {
            postWorkYearQuery = {
                text: "INSERT INTO Work_year " +
                    "(work_hours_examiner,work_hours_supervisor,available_hours_examiner,available_hours_supervisor,person_id,year) " +
                    "VALUES (?,?,?,?,?,?)",
                values: [examiner.examinerHours, examiner.supervisorHours, examiner.examinerHours, examiner.supervisorHours, examiner.user_id, year]
            }
            client
                .query(postWorkYearQuery.text, postWorkYearQuery.values)
                .then(res => {
                    if (res == undefined) {
                        client.end();
                        reject(new Error(dbError.errorCodes.NO_USER_ERROR.code));
                    }
                })
                .catch(err => {
                    client.end()
                    console.error(err);
                    reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
                });
        });
        client.end()
        resolve()
    });
}
function updateWorkYear(year, examiner) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const updateWorkYearQuery = {
            text: "UPDATE Work_year " +
                "SET work_hours_examiner = ? + work_hours_examiner,work_hours_supervisor = ? + work_hours_supervisor, available_hours_examiner = ? + available_hours_examiner, available_hours_supervisor = ? + available_hours_supervisor" +
                "WHERE person_id=? AND year = ?",
            values: [examiner.work_hours_examiner, examiner.work_hours_supervisor, examiner.available_hours_examiner, examiner.available_hours_supervisor, examiner.user_id, year]
        }
        client
            .query(updateWorkYearQuery.text, updateWorkYearQuery.values)
            .then(res => {
                if (res == undefined) {
                    client.end();
                    reject(new Error(dbError.errorCodes.NO_USER_ERROR.code));
                }
                client.end()
                resolve()
            })
            .catch(err => {
                client.end()
                console.error(err);
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            });

    });
}
function getAvailableExaminers(year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const getAvailableExaminersQuery = {
            text: "SELECT User.first_name,User.last_name,User.email,Area_of_expertise.expertise_name, User.user_id, Work_year.available_hours_examiner " +
                "FROM User " +
                "INNER JOIN Expertise ON User.user_id = Expertise.user_id " +
                "INNER JOIN Area_of_expertise ON Expertise.expertise_id = Area_of_expertise.expertise_id " +
                "INNER JOIN Work_year ON User.user_id = Work_year.person_id " +
                "WHERE Work_year.year = ? AND Work_year.available_hours_examiner > 9",
            values: [year]
        }
        client
            .query(getAvailableExaminersQuery.text, getAvailableExaminersQuery.values)
            .then(res => {
                if (res == undefined) {
                    client.end();
                    reject(new Error(dbError.errorCodes.NO_USER_ERROR.code));
                }
                client.end()
                resolve(res);
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
            text: "SELECT user_id FROM User WHERE kth_username= ?",
            values: [username]
        }
        client
            .query(getUserQuery.text, getUserQuery.values)
            .then(res => {
                client.end()
                resolve(res[0].user_id);
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
function getProject(user_id, year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        try {
            client.query("BEGIN")
            const getUserQuery = {
                text: "SELECT project_id, number_of_students, title, project_description,credits,start_date,end_date,in_progress,out_of_date,all_info_specified,company,company_contact,name,address,phone_number,notes " +
                    "FROM (Degree_project LEFT JOIN Company ON Degree_project.company = Company.company_id) " +
                    "WHERE Degree_project.project_id IN (SELECT degree_project_id FROM Student_project WHERE user_id = ?) AND year(start_date) = ?",
                values: [user_id, year]
            }
            client
                .query(getUserQuery.text, getUserQuery.values)
                .then(res => {
                    if (res.length) {
                        let projects = []
                        let getProjectUserQuery;
                        res.forEach((project, index, arr) => {
                            getProjectUserQuery = {
                                text: "SELECT user_type_id,email,first_name,last_name,kth_username,phone_number, User.user_id,Student_project.project_role_id " +
                                    "FROM User INNER JOIN Student_project ON User.user_id = Student_project.user_id " +
                                    "WHERE Student_project.degree_project_id = ?",
                                values: [project.project_id]
                            }
                            client
                                .query(getProjectUserQuery.text, getProjectUserQuery.values)
                                .then(res => {
                                    const users = res
                                    projects.push(new ProjectDetails(project.project_id, project.number_of_students, project.title, project.project_description, project.credits, project.start_date, project.end_date, project.in_progress, project.out_of_date, project.all_info_specified, project.company, project.company_contact, project.name, project.address, project.phone_number, users,null,project.notes))
                                    if (index === arr.length - 1) {
                                        resolve(projects)
                                    }
                                })
                                .catch(err => {
                                    console.error(err)
                                    client.query("ROLLBACK")
                                })
                        })
                        if (res !== undefined) {
                            // const rawProject = res[0]//.person.split('(')[1].split(',');
                            // console.log(new ProjectDetails(res.project_id, res.number_of_students, res.title, res.project_description, res.credits, res.start_date, res.end_date, res.in_progress, res.out_of_date, res.all_info_specified, res.company, res.company_contact, res.name, res.address, res.phone_number,users))
                            // new ProjectDetails(res.project_id, res.number_of_students, res.title, res.project_description, res.credits, res.start_date, res.end_date, res.in_progress, res.out_of_date, res.all_info_specified, res.company, res.company_contact, res.name, res.address, res.phone_number)
                            // console.log(res)
                            // console.log(projects)
                            // resolve(projects)
                        }
                    } else {
                        resolve([])
                    }
                })
                .catch(err => {
                    client.end()
                    client.query("ROLLBACK")
                    console.error(err);
                    reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
                });
        } catch (err) {
            console.error(err)
            client.query("ROLLBACK")
        } finally {
            client.release()
        }
    });
}
/**
 * Adds a new project to the database. 
 * @param {projectDetails} project_details 
 */
function registerProject(project_details, examiner_id) {
    return new Promise(async function (resolve, reject) {
        let client;
        try {
            client = await pool.getConnection()
            // const examiner_id = 1
            let company_id = null;
            let project_id;
            await client.query("BEGIN");
            if (project_details.company_name) {
                let addCompanyQuery = {
                    text: "INSERT INTO Company (name,address,phone_number) "
                        + "VALUES (?,?,?); SELECT LAST_INSERT_ID()",
                    values: [project_details.company_name, project_details.company_address, project_details.company_phone_number]
                }
                await client
                    .query(addCompanyQuery.text, addCompanyQuery.values)
                    .then(res => {
                        company_id = res[0].insertId;
                    })
                    .catch(err => {
                        client.query("ROLLBACK");
                        console.error(err);
                        reject(err);
                    });
            }


            let addProjectDetailsQuery = {
                text: "INSERT INTO Degree_project (number_of_students,title,project_description,credits,start_date,end_date,in_progress,out_of_date,all_info_specified,company,company_contact)" +
                    "VALUES (?,?,?,?,?,?,?,?,?,?,?);" +
                    "SELECT LAST_INSERT_ID()",
                values: [project_details.number_of_students, project_details.project_title, project_details.project_description, project_details.credits, project_details.start_date, project_details.end_date, project_details.in_progress, project_details.out_of_date, project_details.all_info_specified, company_id, project_details.company_contact]
            }

            await client
                .query(addProjectDetailsQuery.text, addProjectDetailsQuery.values)
                .then(res => {
                    project_id = res[0].insertId
                    const addExaminerQuery = {
                        text: "INSERT INTO Student_project (project_role_id,degree_project_id,user_id)" +
                            "VALUES (?,?,?)",
                        values: [ROLE_EXAMINER, project_id, examiner_id]
                    }
                    client
                        .query(addExaminerQuery.text, addExaminerQuery.values)

                    if (project_details.supervisor_id) {
                        const addSupervisorQuery = {
                            text: "INSERT INTO Student_project (project_role_id,degree_project_id,user_id)" +
                                "VALUES (?,?,?)",
                            values: [ROLE_SUPERVISOR, project_id, project_details.supervisor_id]
                        }
                        client
                            .query(addSupervisorQuery.text, addSupervisorQuery.values);
                    }
                })
                .catch(err => {
                    console.error(err)
                    client.query("ROLLBACK");
                    reject(err);
                    throw (err);
                })

            let addStudentQuery = "";
            let addStudentToProjectQuery = "";
            await project_details.users.forEach(student => {
                const email = student.email + '@kth.se'
                addStudentQuery = {
                    text: "INSERT INTO User (user_type_id,first_name,email,kth_username) " +
                        "VALUES (?,?,?,?); " +
                        "SELECT LAST_INSERT_ID()",
                    values: [TYPE_STUDENT, student.name, email, student.email]
                }
                client
                    .query(addStudentQuery.text, addStudentQuery.values)
                    .then(res => {
                        const user_id = res[0].insertId
                        addStudentToProjectQuery = {
                            text: "INSERT INTO Student_project (project_role_id,degree_project_id,user_id) " +
                                "VALUES (?,?,?)",
                            values: [ROLE_STUDENT, project_id, user_id]
                        }
                        client
                            .query(addStudentToProjectQuery.text, addStudentToProjectQuery.values)
                            .catch(err => {

                                console.error(err)
                                //client.query("ROLLBACK"); 
                                // reject(err);
                                //throw(err);
                                reject(new Error(dbError.errorCodes.CREATE_PROJECT_ERROR.code));
                            })
                    })
                    .catch(err => {
                        if (err.code === 'ER_DUP_ENTRY') {
                            addStudentToProjectQuery = {
                                text: "INSERT INTO Student_project (project_role_id,degree_project_id,user_id) " +
                                    "VALUES (?,(SELECT user_id FROM User WHERE kth_username = ?),?)",
                                values: [ROLE_STUDENT, project_id, student.email]
                            }
                            client
                                .query(addStudentToProjectQuery.text, addStudentToProjectQuery.values)
                                .catch(err => {
                                    console.error(err)
                                    throw new Error(dbError.errorCodes.CREATE_PROJECT_ERROR.code);
                                })
                        }
                        console.error(err)
                        throw new Error(dbError.errorCodes.CREATE_PROJECT_ERROR.code);
                    })
            })
            let projectType = "";
            if (project_details.credits == CREDITS_BACHELOR) {
                projectType = "bachelor_hours_";
            } else if (project_details.credits == CREDITS_MASTER) {
                projectType = "master_hours_";
            } else {
                reject(new error(dbError.errorCodes.NO_CREDITS_ERROR.code));
            }

            if (project_details.supervisor_id) {
                projectTypeSupervisor = projectType + "supervisor";
                let updateSupervisorWork = {
                    text: "UPDATE Work_year " +
                        "SET available_hours_supervisor = available_hours_supervisor - " +
                        "(SELECT " + projectTypeSupervisor + " * factor_" + project_details.number_of_students +
                        " FROM Budget_year WHERE Budget_year.year = Work_year.year) WHERE Work_year.person_id = ?",
                    values: [project_details.supervisor_id]
                }
                client.query(updateSupervisorWork.text, updateSupervisorWork.values)
                    .then(res => {

                    })
                    .catch(err => {

                        console.error(err)
                        client.query("ROLLBACK");
                        if (err.errno == 1264) {
                            client.release();
                            reject(new Error(dbError.errorCodes.NO_TIME_AVAILABLE_ERROR.code));
                        }
                        reject(500);
                    })
            }
            projectTypeExaminer = projectType + "examiner";
            let updateExaminerWork = {
                text: "UPDATE Work_year " +
                    "SET available_hours_examiner = available_hours_examiner - " +
                    "(SELECT " + projectTypeExaminer + " * factor_" + project_details.number_of_students +
                    " FROM Budget_year WHERE Budget_year.year = Work_year.year) WHERE Work_year.person_id = ?",
                values: [examiner_id]
            }
            await client.query(updateExaminerWork.text, updateExaminerWork.values)
                .then(res => {
                    client.query("COMMIT");
                    resolve(200);
                })
                .catch(err => {

                    console.error(err)
                    //client.query("ROLLBACK");
                    if (err.errno == 1264) {
                        client.release();
                        //reject(
                        throw new Error(dbError.errorCodes.NO_TIME_AVAILABLE_ERROR.code);//);
                    }
                    //reject(500);
                })

            // addSupervisorToProjectQuery = {
            //     text: "INSERT INTO Student_project (project_role_id,degree_project_id,user_id)" +
            //         "VALUES (?,?,?)",
            //     values: [ROLE_SUPERVISOR, project_id, supervisor_id]
            // }
            // await client
            //     .query(addSupervisorToProjectQuery.text, addSupervisorToProjectQuery.values)
            //     .then(res => {
            //         client.query("COMMIT");
            //         resolve(200);
            //     })
            //     .catch(err => {
            //         console.error(err)
            //         client.query("ROLLBACK"); reject(err);
            //     })
        } catch (e) {
            client.query("ROLLBACK");
            console.error(e);
            reject(e);
        } finally {
            client.release();
        }
    });
}
function updateProject(supervisor_id, project_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let updateSupervisor = {
            text: "UPDATE Student_project " +
                "SET Student_project.user_id = ?, project_role_id = ? " +
                "WHERE  degree_project_id = ? AND project_role_id = ? ",
            values: [supervisor_id, ROLE_SUPERVISOR, project_id, ROLE_SUPERVISOR]
        }
        client
            .query(updateSupervisor.text, updateSupervisor.values)
            .then(res => {
                if (res.affectedRows === 0) {

                    let addSupervisor = {
                        text: "INSERT INTO Student_project (project_role_id,degree_project_id,user_id) " +
                            "VALUES (?,?,?)",
                        values: [ROLE_SUPERVISOR, project_id, supervisor_id]
                    }
                    client
                        .query(addSupervisor.text, addSupervisor.values)
                        .then(res => {
                            if (res.affectedRows === 0) {
                                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
                            }
                            resolve()
                        })
                        .catch(err =>
                            console.error(err)
                        )
                } else {
                    resolve()
                }
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}

function deleteProject(project_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let deleteProject = {
            text: "DELETE FROM Degree_project " +
                "WHERE project_id = ? ",
            values: [project_id]
        }
        client
            .query(deleteProject.text, deleteProject.values)
            .then(res => {
                if (res.affectedRows === 1 || res.affectedRows === 0) {
                    resolve()
                } else {
                    reject(new Error(dbError.errorCodes.DELETE_ERROR.code))
                }
            })
            .catch(err => {
                console.error(err)
                reject(new Error(dbError.errorCodes.DELETE_ERROR.code))
            })
        client.end()
    })
}
function getExpertise(user_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let getExpertise = ' '
        if (user_id === undefined || user_id === null) {
            getExpertise = {
                text: "SELECT expertise_name " +
                    "FROM Area_of_expertise ",
                values: " "
            }
        } else {
            getExpertise = {
                text: "SELECT expertise_name " +
                    "FROM Area_of_expertise INNER JOIN Expertise " +
                    "ON Area_of_expertise.expertise_id = Expertise.expertise_id " +
                    "WHERE Expertise.user_id = ?",
                values: [user_id]
            }
        }
        client
            .query(getExpertise.text, getExpertise.values)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}
function postExpertise(expertise_name) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let postExpertise = {
            text: "INSERT INTO Area_of_expertise (expertise_name)" +
                "VALUES (?)",
            values: [expertise_name]
        }
        client
            .query(postExpertise.text, postExpertise.values)
            .then(res => {
                if (res.affectedRows == 1) {
                    resolve()
                }
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}
function updateExpertise(expertise_name, user_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        const checkExpertiseQuery = {
            text: "SELECT expertise_id FROM Expertise WHERE user_id = ?",
            values: [user_id]
        }
        client.query("BEGIN")
        client
            .query(checkExpertiseQuery.text, checkExpertiseQuery.values)
            .then(res => {
                let updateExpertiseQuery
                if (res[0].expertise_id === NO_EXPERTISE_YET_ID) {
                    updateExpertiseQuery = {
                        text: "INSERT INTO Area_of_expertise (expertise_name) VALUES (?)",
                        values: [expertise_name]
                    }
                } else {
                    updateExpertiseQuery = {
                        text: "UPDATE Area_of_expertise " +
                            "SET expertise_name = ? " +
                            "WHERE expertise_id = (SELECT expertise_id FROM Expertise WHERE user_id = ?) ",
                        values: [expertise_name, user_id]
                    }
                }
                client
                    .query(updateExpertiseQuery.text, updateExpertiseQuery.values)
                    .then(res => {
                        if (res.insertId) {
                            const updateExpertiseIdQuery = {
                                text: "UPDATE Expertise " +
                                    "SET expertise_id = ? " +
                                    "WHERE user_id = ? ",
                                values: [res.insertId, user_id]
                            }
                            client
                                .query(updateExpertiseIdQuery.text, updateExpertiseIdQuery.values)
                                .catch(err => {
                                    console.error(err)
                                    client.query("ROLLBACK")
                                    reject(new Error(dbError.errorCodes.UPDATE_USER_ERROR.code))
                                })
                        }
                        client.query("COMMIT")
                        resolve()
                    })
                    .catch(err => {
                        console.error(err)
                        client.query("ROLLBACK")
                        reject(new Error(dbError.errorCodes.UPDATE_USER_ERROR.code))
                    })
            })
            .catch(err => {
                console.error(err)
                client.query("ROLLBACK")
                reject(new Error(dbError.errorCodes.UPDATE_USER_ERROR.code))
            })
        client.end()
    })
}
function deleteExpertise(expertise_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let deleteExpertise = {
            text: "DELETE FROM Area_of_expertise " +
                "WHERE expertise_id = ? ",
            values: [expertise_id]
        }
        client
            .query(deleteExpertise.text, deleteExpertise.values)
            .then(res => {
                //if (res.affectedRows == 1) {
                resolve()
                //}
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}
function getBudgetYear(year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let getBudgetYear = ""
        if (year === undefined) {
            getBudgetYear = {
                text: "SELECT year,master_hours_examiner,master_hours_supervisor,bachelor_hours_examiner,bachelor_hours_supervisor,total_tutoring_hours,factor_1,factor_2,factor_3,factor_4,factor_5 " +
                    "FROM Budget_year",
                values: []
            }
        } else {
            getBudgetYear = {
                text: "SELECT year,master_hours_examiner,master_hours_supervisor,bachelor_hours_examiner,bachelor_hours_supervisor,total_tutoring_hours,factor_1,factor_2,factor_3,factor_4,factor_5 " +
                    "FROM Budget_year " +
                    "WHERE year = ?",
                values: [year]
            }
        }
        client
            .query(getBudgetYear.text, getBudgetYear.values)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.error(err)

            })
        client.end()
    })
}
function postBudgetYear(budget_year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let postBudgetYear = {
            text: "INSERT INTO Budget_year (year,master_hours_examiner,master_hours_supervisor,bachelor_hours_examiner,bachelor_hours_supervisor,factor_1,factor_2,factor_3,factor_4,factor_5) " +
                "VALUES (?,?,?,?,?,?,?,?,?,?)",
            values: [budget_year.year, budget_year.master_hours_examiner, budget_year.master_hours_supervisor, budget_year.bachelor_hours_examiner, budget_year.bachelor_hours_supervisor,
            budget_year.factor_1, budget_year.factor_2, budget_year.factor_3, budget_year.factor_4, budget_year.factor_5]
        }
        client
            .query(postBudgetYear.text, postBudgetYear.values)
            .then(res => {
                resolve()
            })
            .catch(err => {
                client.end()
                console.error(err.code);
                if (err.code === 'ER_DUP_ENTRY') {
                    reject(new Error(dbError.errorCodes.DUPLICATE_BUDGET_YEAR_ERROR.code))
                }
                reject(err);

            })
        client.end()
    })
}
function updateBudgetYear(budget_year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let updateBudgetYear = {
            text: "UPDATE Budget_year " +
                "SET  year = ? , master_hours_examiner= ?,master_hours_supervisor= ?, bachelor_hours_examiner =?, bachelor_hours_supervisor =?, total_tutoring_hours=?,factor_1=?,factor_2=?,factor_3=?,factor_4=?,factor_5=? " +
                "WHERE year = ?",
            values: [budget_year.year, budget_year.master_hours_examiner, budget_year.master_hours_supervisor, budget_year.bachelor_hours_examiner, budget_year.bachelor_hours_supervisor, budget_year.total_tutoring_hours,
            budget_year.factor_1, budget_year.factor_2, budget_year.factor_3, budget_year.factor_4, budget_year.factor_5, budget_year.year]
        }
        client
            .query(updateBudgetYear.text, updateBudgetYear.values)
            .then(res => {
                //if (res.affectedRows == 1) {
                resolve()
                //}
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}
function deleteBudgetYear(budget_year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let deleteBudgetYear = {
            text: "DELETE FROM Budget_year " +
                "WHERE year = ?",
            values: [budget_year.year]
        }
        client
            .query(deleteBudgetYear.text, deleteBudgetYear.values)
            .then(res => {
                //if (res.affectedRows == 1) {
                resolve()
                //}
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}
function getAvailableSupervisors(year) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection();
        const getAvailableSupervisorsQuery = {
            text: "SELECT User.first_name,User.last_name,User.email,Area_of_expertise.expertise_name, User.user_id, Work_year.available_hours_supervisor " +
                "FROM User " +
                "INNER JOIN Expertise ON User.user_id = Expertise.user_id " +
                "INNER JOIN Area_of_expertise ON Expertise.expertise_id = Area_of_expertise.expertise_id " +
                "INNER JOIN Work_year ON User.user_id = Work_year.person_id " +
                "WHERE Work_year.year = ? AND Work_year.available_hours_supervisor > 9",
            values: [year]
        }
        client
            .query(getAvailableSupervisorsQuery.text, getAvailableSupervisorsQuery.values)
            .then(res => {
                if (res == undefined) {
                    client.end();
                    reject(new Error(dbError.errorCodes.NO_USER_ERROR.code));
                }
                client.end()
                resolve(res);
            })
            .catch(err => {
                client.end()
                console.error(err);
                reject(new Error(dbError.errorCodes.NO_USER_ERROR.code))
            });
    });

}
function updateProjectInTime() {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let updateInTime = {
            text: "UPDATE Degree_project " +
                "SET out_of_date = 1" +
                "WHERE in_progress = 1 AND end_date < GETDATE()"
        }
        client
            .query(updateInTime.text)
            .then(res => {
                resolve()
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}
function login(session_id, first_name, last_name, kth_username, role) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        const email = kth_username + '@kth.se'
        let updateUser = {
            text: "UPDATE User " +
                "SET email = ?, first_name = ?, last_name = ?,kth_username = ?,session_id = ? " +
                "WHERE user_id = (SELECT user_id FROM User WHERE kth_username = ?)",
            values: [email, first_name, last_name, kth_username, session_id, kth_username]
        }
        client
            .query(updateUser.text, updateUser.values)
            .then(res => {
                if (res.affectedRows === 1) {
                    const getRoleId = {
                        text: "SELECT user_type_id FROM User WHERE kth_username = ?",
                        values: [kth_username]
                    }
                    client
                        .query(getRoleId.text, getRoleId.values)
                        .then(res => {
                            resolve(res[0].user_type_id)
                            reject(new Error(dbError.errorCodes.USER_ERROR.code))
                        })
                        .catch(err => {
                            console.error(err)
                            reject(new Error(dbError.errorCodes.LOGIN_ERROR.code))
                        })
                } else if (res.affectedRows === 0) {
                    const registerStudent = {
                        text: "INSERT INTO User (user_type_id,email,first_name,last_name,kth_username,session_id) VALUES (?,?,?,?,?,?) ",
                        values: [ROLE_STUDENT, kth_username + '@kth.se', first_name, last_name, kth_username, session_id]
                    }
                    client
                        .query(registerStudent.text, registerStudent.values)
                        .then(res => {
                            resolve()
                        })
                        .catch(err => {
                            console.error(err)
                            reject(new Error(dbError.errorCodes.LOGIN_ERROR.code))
                        })
                }
            })
            .catch(err => {
                console.error(err)
                reject(new Error(dbError.errorCodes.LOGIN_ERROR.code))
            })
        client.end()
    })
}
function logout(kth_username) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let updateUser = {
            text: "UPDATE User " +
                "SET session_id = 'NO_SESSION' " +
                "WHERE kth_username = ?",
            values: [kth_username]
        }
        client
            .query(updateUser.text, updateUser.values)
            .then(res => {
                resolve()
            })
            .catch(err => {
                console.error(err)
                reject(new Error(dbError.errorCodes.LOGOUT_ERROR.code))
            })
        client.end()
    })
}
function authorizeUser(session_id, kth_username, role_id) {
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let getUserType = {
            text: "SELECT user_type_id FROM User " +
                "WHERE kth_username = ? AND session_id = ?",
            values: [kth_username, session_id]
        }
        client
            .query(getUserType.text, getUserType.values)
            .then(res => {
                if (res.length < 1) {
                    reject(new Error(dbError.errorCodes.INVALID_SESSION.code))
                } else {
                    const user_type_id = parseInt(res[0].user_type_id)
                    if (user_type_id <= role_id) {
                        resolve(user_type_id)
                    } else {
                        reject(new Error(dbError.errorCodes.NO_ACCESS_ERROR.code))
                    }
                }
            })
            .catch(err => {
                console.error(err)
            })
        client.end()
    })
}

function updateNotes(project_id,message){
    return new Promise(async function (resolve, reject) {
        const client = await pool.getConnection()
        let updateNotes = {
            text: "UPDATE Degree_project " +
                "SET notes = ? " +
                "WHERE project_id = ?",
            values: [message,project_id]
        }
        client
            .query(updateNotes.text,updateNotes.values)
            .then(res => {
                resolve()
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
    updateUser,
    deleteUser,
    getWorkYear,
    postWorkYear,
    updateWorkYear,
    getUsername,
    getUserID,
    getProject,
    registerProject,
    updateProject,
    deleteProject,
    getExpertise,
    postExpertise,
    updateExpertise,
    deleteExpertise,
    getBudgetYear,
    postBudgetYear,
    updateBudgetYear,
    deleteBudgetYear,
    getAvailableExaminers,
    getAvailableSupervisors,
    updateProjectInTime,
    login,
    logout,
    authorizeUser,
    updateNotes
}