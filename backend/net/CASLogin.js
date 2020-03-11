var saml2 = require('saml2-js');
const fs = require('fs');
// const cert = require("/Users/molin/Desktop/EXIT/backend/net/md-signer2.crt")
const sp_options = {
    entity_id: "https://samltest.sys.kth.se/idp/shibboleth",
    // private_key: fs.readFileSync("key-file.pem").toString(),
    // certificate: "https://mds.swamid.se/md/md-signer2.crt",
    assert_endpoint: "https://130.237.202.87:8080/assert",
}
const idp_options = {
    sso_login_url: "https://saml-5.sys.kth.se/idp/profile/SAML2/Redirect/SSO",
    sso_logout_url: "https://saml-5.sys.kth.se/",
    // certificates: ["https://mds.swamid.se/md/md-signer2.crt"] //, fs.readFileSync("cert-file2.crt").toString()]
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
        console.log("Logina")
        sp.create_login_request_url(idp, {}, function (err, login_url, request_id) {
            if (err != null)
                return res.send(500);
            res.redirect(login_url);
        });
    });

    // Assert endpoint for when login completes
    router.post("/assert", function (req, res) {
        var options = { request_body: req.body };
        sp.post_assert(idp, options, function (err, saml_response) {
            if (err != null)
                return res.send(500);

            // Save name_id and session_index for logout
            // Note:  In practice these should be saved in the user session, not globally.
            name_id = saml_response.user.name_id;
            session_index = saml_response.user.session_index;
            console.log("Logged in")
            res.send("Hello!");
        });
    });

    // Starting point for logout
    router.get("/logout", function (req, res) {
        var options = {
            name_id: name_id,
            session_index: session_index
        };

        sp.create_logout_request_url(idp, options, function (err, logout_url) {
            if (err != null)
                return res.send(500);
            res.redirect(logout_url);
        });
    });
}
module.exports = {
    router,
}