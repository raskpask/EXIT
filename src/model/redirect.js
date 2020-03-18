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
function removeCookies() {
    const cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
module.exports = {
    checkAccess,
    removeCookies,
}