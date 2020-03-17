const errorCodes = {
    INVALID_SESSION: {
        code: 'INVALID_SESSION',
        message: 'The session is no longer valid'
    },
    NO_ACCESS_ERROR: {
        code: 'NO_ACCESS_ERROR',
        message: 'The the client does not have the access rights to this function.'
    },
}

module.exports = {
    errorCodes,
}