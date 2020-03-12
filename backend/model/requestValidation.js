const dbError = require('../error/dbErrors');

/**
 * Checks if the register input of the user is correct.
 *
 * @param {String} req - Request from the client
 * @returns Boolean
 */
function registerInput(req) {
    try {
        const body = req.body;
        if (!body.hasOwnProperty("email")) {
            return false;
        }
        if (!body.hasOwnProperty("userTypeID")) {
            return false;
        }
        if (!checkEmail(body.email)) {
            return false;
        }
        if (body.hasOwnProperty("firstName")) {
            if (!checkName(body.firstName)) {
                return false;
            }
        }
        if (body.hasOwnProperty("lastName")) {
            if (!checkName(body.lastName)) {
                return false;
            }
        }
        if (body.hasOwnProperty("phoneNumber")) {
            if (!checkPhoneNumber(body.phoneNumber)) {
                return false;
            }
        }
        if (body.hasOwnProperty("kthUsername")) {
            if (!(checkUsername(body.kthUsername) || checkEmail(body.kthUsername))) {
                return false;
            }
        }
    } catch (error) {
        console.error(error);
        return false;
    }

    return true;
}
/**
 * Checks if the user has a valid date for availability and at least one competence.
 *
 * @param {List} competence - List of all competences of the application. Checks if it is empty.
 * @param {List} availability - List of all available date of the application. Checks if it is empty.
 */
function applyInput(competence, availability) {
    if (competence.length < 1) {
        throw Error(dbError.errorCodes.NO_COMPETENCE_ERROR.code)
    } else if (availability.length < 1) {
        throw Error(dbError.errorCodes.NO_AVAILABILITY_ERROR.code)
    }
    return true
}
function checkUsername(username) {
    const regEx = /([0-9]|[a-z]|[A-Z])/g;
    if (!Boolean(username.match(regEx)) || username.length < 1) {
        return false
    }
    return true;
}


function checkEmail(email) {
    email = email.split('@');
    if (email.length < 2 || email.length > 2 || email[1].split('.').length < 2) {
        return false;
    }
    return true;
}
function checkDate(date) {
    const regEx = /[0-9]/g;
    date = date.split('-');
    if (date.lengt < 3 || date.length > 3) {
        return false;
    }
    for (let number in date) {
        if (!Boolean(number.match(regEx))) {
            return false;
        }
    }
    return true;

}
function checkName(name) {
    if (checkUnicode(name) && name.length > 0) {
        return true;
    }
    return false;
}
function checkUnicode(string) {
    for (i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) > 255) {
            return false;
        }
    }
    return true;
}
function checkPhoneNumber(string) {
    return string.replace(/\s/g, '').match(/^[0-9()-+]+$/);
}

function validateProject(request) {
    try {
        // if (Object.keys(request.body).length === 0) {
        //     return false;
        // }
        project = request.body;
        console.log(project);
        if (isNaN(project.credits) || isNaN(project.numberOfStudents)) {
            console.log('NaN');
            return false;
        } else if ((project.credits < 0) || (project.numberOfStudents < 0)) {
            console.log('invalid numbers');
            return false;
        }

        if (!(isDate(project.startDate) && isValidDate(project.startDate) && isDate(project.endDate) && isValidDate(project.endDate))) {
            console.log('Invalid dates');
            return false;
        } else if (new Date(project.startDate) > new Date(project.endDate)) {
            console.log("End date before start date");
            return false;
        }

        if (project.title.length < 1 || project.projectDescription.length < 1) {
            console.log("title or description missing");
            return false;
        }

        if (project.hasOwnProperty("companyName")) {
            if (!project.companyPhone.replace(/\s/g, '').match(/^[0-9()-+]+$/)) {
                console.log("invalid phone number");
                return false;
            }
            if (project.companyName.length < 1 || project.companyAddress.length < 1) {
                console.log("title or description missing");
                return false;
            }
        }

    } catch (error) {
        console.log(error);
        return false;
    }
    return true;
}
function isValidDate(date) {
    var separators = ['\\.', '\\-', '\\/'];
    var bits = date.split(new RegExp(separators.join('|'), 'g'));
    var d = new Date(bits[0], bits[1] - 1, bits[2]);
    return d.getFullYear() == bits[0] && d.getMonth() + 1 == bits[1];
}
function isDate(isISO) {
    if (new Date(isISO) !== "Invalid Date" && !isNaN(new Date(isISO))) {
        return true;
    } else {
        return false;
    }
}
function isValidType(userType) {
    if ( userType < 1 || 5 < userType){
        throw new Error(dbError.errorCodes.BAD_REQUEST_ERROR.code);
    }
    return true
}
function isValidNumber(ID) {
    if (isNaN(ID) || ID < 0) {
        if(ID === undefined){
            return true
        }
        throw new Error(dbError.errorCodes.BAD_REQUEST_ERROR.code);
    }
    return true;
}


module.exports = {
    registerInput,
    applyInput,
    validateProject,
    isValidNumber,
    isValidType
}