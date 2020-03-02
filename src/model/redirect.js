function checkAccess(accessLevel) {
    if (extractPrivLevel() > accessLevel) {
        return false;
    }
    return true;
}
function extractPrivLevel() {
    return 1;
}
module.exports = {
    checkAccess,
}