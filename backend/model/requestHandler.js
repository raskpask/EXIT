const User = require('./user');
const ProjectDetails = require('./projectDetails');
const Application = require('./application');
const userDAO = require('../integration/userDAO');
const validation = require('./requestValidation');
const dbError = require('../error/dbErrors');
const BudgetYear = require('./budgetYear.js');

/**
 * Extracts the credentials of the client request
 *
 * @param {String} req - Request from the client
 * @returns JSON of credentials.
 */
function extractUserDataFromCookie(req) {
    const session_id = req.headers.cookie.split('session_id=')[1].split(';')[0]
    const kth_username = req.headers.cookie.split('username=')[1].split(';')[0]
    const user_info = {
        session_id: session_id,
        kth_username: kth_username
    }
    return user_info
}

/**
 * Extracts the useranme of the client request.
 *
 * @param {String} req - Request from the client
 * @returns String of username
 */
function extractUsername(req) {
    return req.body.kth_username;
}
function extractUserTypeId(req){
    return req.body.user_type_id
}
/**
 * Extracts the user from the client request.
 *
 * @param {String} req - Request from the client
 * @returns Instance of user.
 */
function extractUser(req) {
    if (validation.registerInput(req)) {
        userType = null;
        email = '';
        firstName = null;
        lastName = null;
        kthUsername = null;
        phoneNumber = null;


        const body = req.body;
        email = body.email;
        userType = body.userTypeID;
        if (body.hasOwnProperty("firstName")) {
            firstName = body.firstName;
        }
        if (body.hasOwnProperty("lastName")) {
            lastName = body.lastName;
        }
        if (body.hasOwnProperty("phoneNumber")) {
            phoneNumber = body.phoneNumber;
        }
        if (body.hasOwnProperty("kthUsername")) {
            kthUsername = body.kthUsername;
        }

        return new User(userType, email, firstName, lastName, kthUsername, phoneNumber, null);
    } else {
        throw new Error(dbError.errorCodes.BAD_REQUEST_ERROR.code);
    }
}
/**
 * Extract the language of the client from the cookie
 *
 * @param {String} req - Request from client
 * @returns String of language
 */
function extractLang(req) {
    cookieHeader = req.headers.cookie;
    if (cookieHeader === undefined) {
        return 'en-us';
    }
    const langCookie = cookieHeader.split('lang=');
    if (langCookie === undefined || langCookie.length < 2) {
        return 'en-us';
    }
    const lang = langCookie[1].split(';')[0];
    return lang ? lang : 'en-us';
}
/**
 * Extracts the client token from the request.
 *
 * @param {String} req - Request from the client
 * @returns String of token
 */
function extractToken(req) {
    cookieHeader = req.headers.cookie;
    if (cookieHeader === undefined) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)
    }
    const authToken = cookieHeader.split('authToken=');
    const privToken = cookieHeader.split('privilegeLevel=');
    if (authToken === undefined || privToken === undefined) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)
    } else if (authToken.length < 2 || privToken.length < 2) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)

    } else if (privToken.length < 2) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)
    }
    const token = authToken[1].split(';')[0];
    return token ? token : null;
}
/**
 * Creates new projectDetails from data provided by the user.
 * @param {String} req - the request containting the data.
 * @returns Instance of ProjectDetails 
 */
function extractRegisterProjectDetails(req) {
    if (validation.validateProject(req)) {
        let project_id = null;
        let number_of_students = 0;
        let project_title = '';
        let project_description = '';
        let credits = 0;
        let start_date = '';
        let end_date = '';
        let in_progress = null;
        let out_of_date = null;
        let all_info_specified = null;
        let company = null;
        let company_contact = null;
        let company_name = null;
        let company_address = null;
        let company_phone_number = null;
        let students= [];
        let supervisor_id = null;

        //if(Boolean(req.body)){
        let project = req.body;//JSON.parse(req.body);
        // console.log(project);

        //project_id = project.project_id;
        students = project.students;
        number_of_students = project.numberOfStudents;
        project_title = project.title;
        project_description = project.projectDescription;
        credits = project.credits;
        start_date = project.startDate;
        end_date = project.endDate;

        if(project.supervisorID){
            supervisor_id = project.supervisorID
        }
        if (project.companyName) {
            company_name = project.companyName;
            company_address = project.companyAddress;
            company_phone_number = project.companyPhone;
        }
        //}

        pd = new ProjectDetails(project_id, number_of_students, project_title, project_description, credits, start_date, end_date, in_progress, out_of_date, all_info_specified, company, company_contact, company_name, company_address, company_phone_number,students,supervisor_id);
        // console.log(pd);
        return pd;
    } else {
        throw new Error(dbError.errorCodes.BAD_REQUEST_ERROR.code);
    }
}
/**
 * Gets the user ID from a request
 * @param {String} req 
 */
function extractUserID(req) {
    ID = req.body.userID;
    validation.isValidNumber(ID);
    return ID;
}
function extractUserType(req){
    const userType = req.query.userRoleId
    validation.isValidType(userType)
    return userType
}
/**
 * Gets the project ID from a request
 * @param {String} req 
 */
function extractProjectID(req) {
    ID = req.body.projectID;
    validation.isValidNumber(ID);
    return ID;
}
function extractWorkYear(req) {
    return req.body.examiners
}
function extractExpertiseID(req) {
    return req.body.expertiseID;
}
function extractExpertiseName(req) {
    return req.body.expertise;
}
function extractBudgetYear(req) {
    const budgetYear = req.body;
    const year = budgetYear.budgetYear
    const master_hours_supervisor = budgetYear.masterHoursSupervisor
    const master_hours_examiner = budgetYear.masterHoursExaminer
    const bachelor_hours_supervisor = budgetYear.bachleorHoursSupervisor
    const bachelor_hours_examiner = budgetYear.bachleorHoursExaminer
    const total_tutoring_hours = budgetYear.totalTutoringHours
    let factors = [];
    factors.push(budgetYear.factor1)
    factors.push(budgetYear.factor2)
    factors.push(budgetYear.factor3)
    factors.push(budgetYear.factor4)
    factors.push(budgetYear.factor5)
    factors.forEach( factor => {
        if(factor === ""){
            factor = 1;
        }
    })
    console.log(factors[2])
    return new BudgetYear(year, bachelor_hours_examiner, bachelor_hours_supervisor, master_hours_examiner, master_hours_supervisor, total_tutoring_hours, factors[0], factors[1], factors[2], factors[3], factors.pop[4]);
}
function extractYear(req){
    return req.query.year
}
function extractBudgetYearProject(req){
    return req.query.year
}

function extractUsernameFromCookie(req){
    cookieHeader = req.headers.cookie;
    if (cookieHeader === undefined) {
        throw new Error(dbError.errorCodes.NO_TOKEN_ERROR.code)
    }
    return cookieHeader.split('username=')[1].split(';')[0];
}
module.exports = {
    extractProjectID,
    extractBudgetYear,
    extractYear,
    extractUsername,
    extractUserID,
    extractUserDataFromCookie,
    extractUser,
    extractToken,
    extractUsernameFromCookie,
    extractLang,
    extractRegisterProjectDetails,
    extractBudgetYearProject,
    extractUserID,
    extractExpertiseName,
    extractExpertiseID,
    extractWorkYear,
    extractUserType,
    extractUserTypeId
}