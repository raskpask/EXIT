var saml2 = require('saml2-js');
const fs = require('fs');
// const cert = require("/Users/molin/Desktop/EXIT/backend/net/md-signer2.crt")
const sp_options = {
    entity_id: "https://samltest.sys.kth.se/idp/shibboleth",
    // private_key: fs.readFileSync("key-file.pem").toString(),
    certificate: "MIIDPzCCAiegAwIBAgIUScUSOrMmb/KzMd1Muhpc5sElLeswDQYJKoZIhvcNAQEL BQAwIDEeMBwGA1UEAwwVc2FtbHRlc3QtNS5zeXMua3RoLnNlMB4XDTE3MTAyNTEx Mzk0MFoXDTM3MTAyNTEyMzk0MFowIDEeMBwGA1UEAwwVc2FtbHRlc3QtNS5zeXMu a3RoLnNlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8q6XIIiftB1G 2I//JwVR8qRBbhfdzzGHbCQr5lFrUXYV89dmsk6E2Nr9rQP+yrYZU/eIDJ4XBQdI oIWe8u1ImtPWjzTHVXd5z2SmRJ98EFFZtju2mCLqqD4qUcNl3DbaPXgqy5Hm5ohV mEQlxO1jO7xq/f4n6d72noQCWTfYdXOZwD1voEc4Hox2AWP+tPx0FLRSqj3h+44s elVwEObb8pxQEYmsfxVnBm2i/aOBLlsntaLQhCFjs5umLd4UDP9lvIwJYx460QX6 PyHAYDMA8h9VNO/jfKp97JwtKf0Yrh3RUJ210MNkYcV5N8JBUX+KGT7fYI6FN9OX +QTXupKPQwIDAQABo3EwbzAdBgNVHQ4EFgQUvyWzocZiagOIj4tWholK1IuwGSMw TgYDVR0RBEcwRYIVc2FtbHRlc3QtNS5zeXMua3RoLnNlhixodHRwczovL3NhbWx0 ZXN0LTUuc3lzLmt0aC5zZS9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0BAQsFAAOC AQEA64IorZp5656GLTNnlBFEvegWYPQE3GW+tDMJ40lzzhY+QSpM1FIxggF2YJsT VhEWNqITZz1lcKjEycBaR8kEDatg0fgjhXrwGwVKIOqU+bZTZF5Ez8r0d9Y0DYSe kGSKCdIYung1ylHcuCFC79Ls197OHkLRwn0DNoNEld9bHdE+keipdq5oR5xjZeys cNcwYx6ss2ody6XieevUCsbMhHfzniA1V2ccK8dAmzoLCkqoeIN8HISbOCh+JN2x Iol9Vr1XBYMb8c7q8mIK7Jo8iZy3lzGL15YHnVRGw0lEIFnbyw+hs9kiKtAavwZj dYVmg1bH4O/srfw2WyZikn6tCg==",
    assert_endpoint: "https://130.237.202.87:8080/assert",
}
const idp_options = {
    sso_login_url: "https://samltest-5.sys.kth.se/idp/profile/Shibboleth/SSO",
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
        console.log("Login")
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