const userDAO = require('../integration/userDAO');
const requestHandler = require('../model/requestHandler');
const authToken = require('../model/authToken');
const dbError = require('../error/dbErrors')
const ADMIN_PRIVILEGE = 1
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
    const changeToUserType = requestHandler.extractUserTypeId(req)
    const userRoleId = await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    if(isNaN(changeToUserType)){
        throw new Error(dbError.errorCodes.BAD_REQUEST_ERROR.code)
    }else if(userRoleId < changeToUserType) {
        console.log("changeToUserType" + changeToUserType)
        const username = requestHandler.extractUsername(req)
        return await userDAO.registerUser(username, changeToUserType)
    } else {
        throw new Error(dbError.errorCodes.NO_ACCESS_ERROR.code)
    }
}
/**
 * 
 * @param {String} req 
 */
async function registerProject(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
        const projectDetails = requestHandler.extractRegisterProjectDetails(req);
        console.log(projectDetails)
        const examiner_id = await userDAO.getUserID(requestHandler.extractUsernameFromCookie(req))
        return await userDAO.registerProject(projectDetails,examiner_id);
    } catch (error) {
        throw error
    }

}

/**
 * Fetches a user from the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with user
 */
async function getUser(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
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
        const user_id = await userDAO.getUserID(requestHandler.extractUsernameFromCookie(req))
        const budget_year = requestHandler.extractBudgetYearProject(req)
        return await userDAO.getProject(user_id,budget_year)
    }
    catch (error) {
        throw error
    }
}

async function updateProject(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
        return await userDAO.updateProject(req.body.supervisor_id, req.body.project_id);
    }
    catch (error) {
        throw error
    }
}
async function deleteProject(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
        return await userDAO.deleteProject(req.body.project_id);
    }
    catch (error) {
        throw error
    }
}
async function updateNotes(req){
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
        return await userDAO.updateNotes(requestHandler.extractProjectID(req),req.body.message);
    }
    catch (error){
        throw error
    }
}

async function getWorkYear(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
        return await userDAO.getWorkYear(req.body.user_id, req.body.year);
    }
    catch (error) {
        throw error
    }
}
async function postWorkYear(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), DICRECTOR_PRIVILEGE)
        return await userDAO.postWorkYear(req.body.budgetYear, requestHandler.extractWorkYear(req));
    }
    catch (error) {
        throw error
    }
}
async function updateWorkYear(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), DICRECTOR_PRIVILEGE)
        return await userDAO.updateWorkYear(req.body.year, requestHandler.extractWorkYear(req));
    }
    catch (error) {
        throw error
    }
}
async function getAvailableExaminers(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), STUDENT_PRIVILEGE)
        return await userDAO.getAvailableExaminers(req.query.year);
    }
    catch (error) {
        throw error
    }
}
async function getAvailableSupervisors(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), STUDENT_PRIVILEGE)
        return await userDAO.getAvailableSupervisors(req.query.year);
    }
    catch (error) {
        throw error
    }
}

/**
 * Changes the the user in the DB.
 *
 * @param {String} req - The request of the client.
 * @returns Promise with 200.
 */
async function updateUser(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    const updateUser = requestHandler.extractUser(req);
    return await userDAO.updateUser(updateUser, requestHandler.extractToken(req));
}

async function getExpertise(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), STUDENT_PRIVILEGE)
    return await userDAO.getExpertise(requestHandler.extractUserID(req))
}
async function postExpertise(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    return await userDAO.postExpertise(requestHandler.extractExpertiseName(req))
}
async function updateExpertise(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    const user_id = await userDAO.getUserID(requestHandler.extractUsernameFromCookie(req));
    return await userDAO.updateExpertise(requestHandler.extractExpertiseName(req), user_id)
}
async function deleteExpertise(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    return await userDAO.deleteExpertise(requestHandler.extractExpertiseID(req))
}
async function getBudgetYear(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    return await userDAO.getBudgetYear()
}
async function postBudgetYear(req) {
    try {
        await authorizeUser(requestHandler.extractUserDataFromCookie(req), DICRECTOR_PRIVILEGE)
        return await userDAO.postBudgetYear(requestHandler.extractBudgetYear(req))
    } catch (error) {
        throw error;
    }
}
async function updateBudgetYear(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), DICRECTOR_PRIVILEGE)
    return await userDAO.updateBudgetYear(requestHandler.extractBudgetYear(req))
}
async function deleteBudgetYear(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), DICRECTOR_PRIVILEGE)
    return await userDAO.deleteBudgetYear(requestHandler.extractBudgetYear(req))
}

async function deleteUser(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), ADMIN_PRIVILEGE)
    return await userDAO.deleteUser(requestHandler.extractUserID(req));
}
async function updateUser(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    return await userDAO.updateUser(requestHandler.extractUser(req));
}
async function getProfile(req) {
    await authorizeUser(requestHandler.extractUserDataFromCookie(req), EXAMINER_PRIVILEGE)
    const userId = await userDAO.getUserID(requestHandler.extractUsernameFromCookie(req));
    const workYear = await userDAO.getWorkYear(userId, requestHandler.extractYear(req))
    const expertise = await userDAO.getExpertise(userId);
    return { workYear, expertise }
}
async function login(session_id, first_name, last_name, kth_username, role) {
    return await userDAO.login(session_id, first_name, last_name, kth_username, role);
}
async function authorizeUser(user_info, privilege_level) {
    return await userDAO.authorizeUser(user_info.session_id, user_info.kth_username, privilege_level);
}
async function logout(kth_username) {
    return await userDAO.logout(kth_username);
}

module.exports = {
    logout,
    registerUser,
    registerProject,
    getUser,
    updateUser,
    deleteUser,
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
    getProfile,
    updateNotes
}