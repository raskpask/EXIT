const userDAO = require('../integration/userDAO');
const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');
const dbError = require('../error/dbErrors')
/**
 * Registers a user in the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with 200
 */
async function registerUser(req) {
    const registerUser = requestHandler.extractUser(req);
    return await userDAO.registerUser(registerUser);
}
/**
 * 
 * @param {String} req 
 */
async function registerProject(req) {
    const projectDetails = requestHandler.extractRegisterProjectDetails(req);
    return await userDAO.registerProject(projectDetails);
}
/**
 * Authenticate a user. Checks if the client used the right credentials and generate a cookie to set it to the user.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with the user
 */
async function authenticateUser(req) {
    const credentials = requestHandler.extractCredentials(req);
    const token = authToken.generate();
    await userDAO.authenticateUser(credentials);
    await userDAO.changeAuthToken(credentials, token);
    return await userDAO.getUser(token);
}
/**
 * Logouts a user and removes the token from the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with token.
 */
async function deAuthenticateUser(req) {
    const token = requestHandler.extractToken(req);
    return await userDAO.changeAuthToken(null, token);
}
/**
 * Fetches a user from the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with user
 */
async function getUser(req) {
    try {
        return await userDAO.getUser(requestHandler.extractUserID(req));
    }
    catch (error) {
        throw error
    }
}
/**
 * Fetches a project from the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with user
 */
async function getProject(req) {
    try {
        return await userDAO.getProject(1,2020);//requestHandler.extractProjectID(req));
    }
    catch (error) {
        throw error
    }
}
async function updateProject(req) {
    try {
        return await userDAO.updateProject(req.body.supervisor_id,req.body.project_id);
    }
    catch (error) {
        throw error
    }
}
async function deleteProject(req) {
    try {
        console.log(req)
        return await userDAO.deleteProject(req.body.project_id);
    }
    catch (error) {
        throw error
    }
}


async function getWorkYear(req) {
    try {
        return await userDAO.getWorkYear(req.body.user_id,req.body.year);
    }
    catch (error) {
        throw error
    }
}
async function updateWorkYear(req) {
    try {
        return await userDAO.updateWorkYear(req.body.user_id,req.body.year,requestHandler.extractWorkYear(req));
    }
    catch (error) {
        throw error
    }
}
async function getAvailableExaminers(req) {
    try {
        return await userDAO.getAvailableExaminers(req.query.year);
    }
    catch (error) {
        throw error
    }
}
async function getAvailableSupervisors(req) {
    try {
        return await userDAO.getAvailableSupervisors(req.query.year);
    }
    catch (error) {
        throw error
    }
}

/**
 * Validates if the username is in the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with a string, Username taken or Username not taken.
 */
async function checkIfUsernameIsAvailable(req) {
    return await userDAO.checkIfUsernameIsAvailable(requestHandler.extractUsername(req));
}
/**
 * Changes the the user in the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with 200.
 */
async function updateUser(req) {
    const updateUser = requestHandler.extractUser(req);
    return await userDAO.updateUser(updateUser, requestHandler.extractToken(req));
}
/**
 * Fetch an application
 *
 * @param {String} req - The request of the client.
 * @returns Promise with list of all matching applications
 */
async function getApplication(req) {
    try {
        const token = requestHandler.extractToken(req);
        const application = await requestHandler.extractApplication(req)
        const lang = await requestHandler.extractLang(req);
        let privilegeLevel = await userDAO.getPrivilegeLevel(token);
        if (privilegeLevel == "no access") {
            throw new Error(dbError.errorCodes.NO_ACCESS_ERROR);
        }
        return await userDAO.getApplication(privilegeLevel, application, lang);
    } catch (error) {
        throw error
    }
}
/**
 * Creates a application. 
 *
 * @param {String} req - The request of the client.
 * @returns Promise with 200.
 */
async function createApplication(req) {
    const token = await requestHandler.extractToken(req);
    const application = await requestHandler.extractCreateApplication(req);
    const user = await userDAO.getUser(token);
    return await userDAO.createApplication(application, user);
}
/**
 * Update the application status and last edited.
 *
 * @param {String} req - The request of the client.
 * @returns {Promise} - with code 200.
 */
async function updateApplicationStatus(req) {
    const token = requestHandler.extractToken(req)
    let privilegeLevel = await userDAO.getPrivilegeLevel(token);
    if (privilegeLevel == "no access" || privilegeLevel.role_id > 1) {
        throw new Error(dbError.errorCodes.NO_ACCESS_ERROR.code);
    }
    return await userDAO.updateApplicationStatus(req.body.status, req.body.id, req.body.lastEdited);
}
/**
 * Fetches the competences of the user.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with list competences.
 */
async function getCompetence(req) {
    const lang = requestHandler.extractLang(req);
    return await userDAO.getCompetence(lang);
}
/**
 * Fetches the token of the User
 *
 * @param {String} req - The request of the client.
 * @returns String with token.
 */
function getToken(req) {
    return requestHandler.extractToken(req);
}

/**
 * Extracts language cookie from header.
 *
 * @param {String} req - Request from client
 * @returns String of language
 */
function extractLangCookie(req) {
    return requestHandler.extractLang(req);
}
function getExpertise(req){
    return userDAO.getExpertise(requestHandler.extractUserID(req))
}
function postExpertise(req){
    return userDAO.postExpertise(requestHandler.extractExpertiseName(req))
}
function updateExpertise(req){
    // console.log(req.body)
    return userDAO.updateExpertise(requestHandler.extractExpertiseName(req),requestHandler.extractExpertiseID(req))
}
function deleteExpertise(req){
    return userDAO.deleteExpertise(requestHandler.extractExpertiseID(req))
}
function getBudgetYear(req){
    return userDAO.getBudgetYear()
}
function postBudgetYear(req){
    try{
    return userDAO.postBudgetYear(requestHandler.extractBudgetYear(req))
    }catch(error){
        throw error;
    }
}
function updateBudgetYear(req){
    return userDAO.updateBudgetYear(requestHandler.extractBudgetYear(req))
}
function deleteBudgetYear(req){
    return userDAO.deleteBudgetYear(requestHandler.extractBudgetYear(req))
}

function deleteUser(req){
    return userDAO.deleteUser(requestHandler.extractUserID(req));
}
function updateUser(req){
    return userDAO.updateUser(requestHandler.extractUser(req));
}

module.exports = {
    registerUser,
    registerProject,
    authenticateUser,
    getUser,
    updateUser,
    deleteUser,
    getApplication,
    createApplication,
    updateApplicationStatus,
    deAuthenticateUser,
    getCompetence,
    checkIfUsernameIsAvailable,
    getToken,
    extractLangCookie,
    getProject,
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
    getWorkYear,
    updateWorkYear,
    getAvailableExaminers,
    getAvailableSupervisors
}