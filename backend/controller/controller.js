const userDAO = require('../integration/userDAO');
const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');
const dbError = require('../error/dbErrors')
const ADMIN_PRIVELEGE = 1
const DICRECTOR_PRIVILEGE = 2
const EXAMINER_PRIVILEGE = 3
const STUDENT_PRIVILEGE = 4

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
    try {
        const projectDetails = requestHandler.extractRegisterProjectDetails(req);
        return await userDAO.registerProject(projectDetails);
    } catch (error) {
        console.log(error + " IN THE CONTROLLER");
        throw error
    }

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
        return await userDAO.getUser(requestHandler.extractUserID(req), requestHandler.extractUserType(req));
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
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
        return await userDAO.getProject(1, 2020);//requestHandler.extractProjectID(req));
    }
    catch (error) {
        throw error
    }
}
async function updateProject(req) {
    try {
        return await userDAO.updateProject(req.body.supervisor_id, req.body.project_id);
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
        return await userDAO.getWorkYear(req.body.user_id, req.body.year);
    }
    catch (error) {
        throw error
    }
}
async function postWorkYear(req) {
    try {
        return await userDAO.postWorkYear(req.body.budgetYear, requestHandler.extractWorkYear(req));
    }
    catch (error) {
        throw error
    }
}
async function updateWorkYear(req) {
    try {
        return await userDAO.updateWorkYear(req.body.year, requestHandler.extractWorkYear(req));
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

async function getExpertise(req) {
    return await userDAO.getExpertise(requestHandler.extractUserID(req))
}
async function postExpertise(req) {
    return await userDAO.postExpertise(requestHandler.extractExpertiseName(req))
}
async function updateExpertise(req) {
    // console.log(req.body)
    return await userDAO.updateExpertise(requestHandler.extractExpertiseName(req), requestHandler.extractExpertiseID(req))
}
async function deleteExpertise(req) {
    return await userDAO.deleteExpertise(requestHandler.extractExpertiseID(req))
}
async function getBudgetYear(req) {
    return await userDAO.getBudgetYear()
}
async function postBudgetYear(req) {
    try {
        return await userDAO.postBudgetYear(requestHandler.extractBudgetYear(req))
    } catch (error) {
        throw error;
    }
}
async function updateBudgetYear(req) {
    return await userDAO.updateBudgetYear(requestHandler.extractBudgetYear(req))
}
async function deleteBudgetYear(req) {
    return await userDAO.deleteBudgetYear(requestHandler.extractBudgetYear(req))
}

async function deleteUser(req) {
    return await userDAO.deleteUser(requestHandler.extractUserID(req));
}
async function updateUser(req) {
    return await userDAO.updateUser(requestHandler.extractUser(req));
}
async function getProfile(req) {
    const userId = await userDAO.getUserID(requestHandler.extractUsernameFromCookie(req));
    const workYear = await userDAO.getWorkYear(userId,requestHandler.extractYear(req))
    // const expertise = await userDAO.getExpertise(userId);
    const expertise = await userDAO.getExpertise(24);
    return {workYear,expertise}
}
async function login(session_id, first_name, last_name, kth_username, role) {
    return await userDAO.login(session_id, first_name, last_name, kth_username, role);
}
async function authorizeUser(user_info, privilege_level) {
    return await userDAO.authorizeUser(user_info.session_id, user_info.kth_username, privilege_level);
}


module.exports = {
    registerUser,
    registerProject,
    authenticateUser,
    getUser,
    updateUser,
    deleteUser,
    deAuthenticateUser,
    checkIfUsernameIsAvailable,
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
    postWorkYear,
    updateWorkYear,
    getAvailableExaminers,
    getAvailableSupervisors,
    login,
    getProfile
}