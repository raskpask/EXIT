function checkAccess(accessLevel) {
    if (extractPrivLevel() > accessLevel) {
        return false;
    }
    return true;
}
function extractPrivLevel() {
    if (document.cookie.split('role_id=')[1]) {
        return parseInt(document.cookie.split('role_id=')[1].split(';')[0])
    }
    return 5
}
module.exports = {
    checkAccess,
}