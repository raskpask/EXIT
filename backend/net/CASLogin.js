const saml2 = require('saml2-js');
const controller = require('../controller/controller');
const fs = require('fs');
const dbErrors = require('../error/dbErrors');

const path = __dirname.split("\\").join("/");
const private_key = path + "/key-file.pem"
const cert = path + "/certificate.pem"
const DigiCertCA = path + "/DigiCertCA.crt"
const exit_ict_kth_se = path + "/exit_ict_kth_se.crt"
// const cert = require("/Users/molin/Desktop/EXIT/backend/net/md-signer2.crt")
const sp_options = {
    entity_id: "https://exit.ict.kth.se/",
    private_key: fs.readFileSync(private_key, "utf-8").toString(),
    certificate: fs.readFileSync(cert, "utf-8").toString(),
    assert_endpoint: "https://exit.ict.kth.se/assert",
}
const idp_options = {
    sso_login_url: "https://saml-5.sys.kth.se/idp/profile/SAML2/Redirect/SSO",
    sso_logout_url: "https://saml-5.sys.kth.se/Shibboleth.sso/Logout?return=https://exit.ict.kth.se/",
    certificates: [ fs.readFileSync(DigiCertCA, "utf-8").toString(), fs.readFileSync(exit_ict_kth_se, "utf-8").toString()]
};
const sp = new saml2.ServiceProvider(sp_options);
const idp = new saml2.IdentityProvider(idp_options);

/**
 * Routes all api requests. 
 *
 * @param {App} router - The express application.
 */
function router(router) {
    // Endpoint to retrieve metadata
    router.get("/metadata.xml", function (req, res) {
        res.type('application/xml');
        res.send(sp.create_metadata());
    });

    // Starting point for login
    router.get("/login", function (req, res) {
        sp.create_login_request_url(idp, {}, function (err, login_url, request_id) {
            if (err != null)
                return res.send(500);
            res.redirect(login_url);
        });
    });

    // Assert endpoint for when login completes
    router.post("/assert", function (req, res) {
        var options = { request_body: req.body };
        sp.post_assert(idp, options, async function (err, saml_response) {
            if (err != null) {
                console.error(err)
                return res.sendStatus(500);
            }
            // Save name_id and session_index for logout
            // Note:  In practice these should be saved in the user session, not globally.
            // const name_id = saml_response.user.name_id;
            // const session_index = saml_response.user.session_index;
            res.cookie('name_id', saml_response.user.name_id);
            res.cookie('session_id', saml_response.user.session_index);
            const session_id = saml_response.user.session_index
            // if(req.headers.cookie){
            //     session_id = req.headers.cookie.split('SSO_SESSION_START=')[1].split(';')[0]
            // }
            const attributes = JSON.stringify(saml_response.user.attributes)
            const nameAndUsername = attributes.split('"urn:oid:2.5.4.3":["')[1].split('"')[0].split(' ')
            const first_name = nameAndUsername[0]
            const last_name = nameAndUsername[1]
            const username = nameAndUsername[2].split('(')[1].split(')')[0]
            const role = getRole(attributes.split('"urn:oid:1.3.6.1.4.1.5923.1.1.1.1":["')[1].split('"')[0])
            res.cookie('username', username)
            const role_id = await controller.login(session_id, first_name, last_name, username, role)
            res.cookie('role_id', role_id)
            res.redirect('/')
        });
    });

    // Starting point for logout
    router.get("/logout", async function (req, res) {
        try {
            // const options = {
            //     name_id: req.headers.cookie.split('name_id=')[1].split(';')[0],
            //     session_index: req.headers.cookie.split('session_index=')[1].split(';')[0]
            // };

            // sp.create_logout_request_url(idp, options, function (err, logout_url) {
            //     if (err != null)
            //         return res.send(500);
            //     res.redirect(logout_url);
            // });
            const username = req.headers.cookie.split('username=')[1].split(';')[0]
            await controller.logout(username)

            res.clearCookie('session_id');
            res.clearCookie('role_id');
            res.clearCookie('username');
            res.clearCookie('name_id');
            res.redirect('/')

        } catch (err) {
            dbErrors.respondError(err.message, res)
            console.error(err)
        }
    });
}
function getRole(role) {
    if (role === 'student') {
        return 4
    } else if (role === 'examiner') {
        return 3
    } else if (role === 'director') {
        return 2
    } else {
        return 5
    }
}
module.exports = {
    router,
}