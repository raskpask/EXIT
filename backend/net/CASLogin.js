const session = require('express-session');
const CASAuthentication = require('cas-authentication');

const cas = new CASAuthentication({
    cas_url: 'https://login.kth.se',
    service_url: 'https://130.237.202.87:8080'
});
/**
 * Routes all api requests. 
 *
 * @param {App} router - The express application.
 */
function router(router) {
    router.use( session({
        secret            : 'super secret key',
        resave            : false,
        saveUninitialized : true
    }));
    router.get('/app', cas.bounce, function (req, res) {
        res.send('<html><body>Hello!</body></html>');
    });

    router.get('/api', cas.block, function (req, res) {
        res.json({ success: true });
    });
    router.get( '/api/user', cas.block, function ( req, res ) {
        res.json( { cas_user: req.session[ cas.session_name ] } );
    });
    router.get( '/authenticate', cas.bounce_redirect );
    router.get( '/logout', cas.logout );
}
    module.exports = {
        router,
    }