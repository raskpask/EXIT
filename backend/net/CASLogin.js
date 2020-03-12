var saml2 = require('saml2-js');
const fs = require('fs');
let path = __dirname.split("\\").join("/");
const private_key = path+"/key-file.pem"
const cert = path+"/certificate.pem"
// const cert = require("/Users/molin/Desktop/EXIT/backend/net/md-signer2.crt")
const sp_options = {
    entity_id: "https://exit.ict.kth.se/",
    private_key: fs.readFileSync(private_key,"utf-8").toString(),
    certificate: fs.readFileSync(cert,"utf-8").toString(),
    assert_endpoint: "https://exit.ict.kth.se/assert",
}
const idp_options = {
    sso_login_url: "https://samltest-5.sys.kth.se/idp/profile/SAML2/Redirect/SSO",
    sso_logout_url: "https://saml-5.sys.kth.se/",
    certificates: ["MIIDPzCCAiegAwIBAgIUScUSOrMmb/KzMd1Muhpc5sElLeswDQYJKoZIhvcNAQELBQAwIDEeMBwGA1UEAwwVc2FtbHRlc3QtNS5zeXMua3RoLnNlMB4XDTE3MTAyNTExMzk0MFoXDTM3MTAyNTEyMzk0MFowIDEeMBwGA1UEAwwVc2FtbHRlc3QtNS5zeXMua3RoLnNlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA8q6XIIiftB1G2I//JwVR8qRBbhfdzzGHbCQr5lFrUXYV89dmsk6E2Nr9rQP+yrYZU/eIDJ4XBQdIoIWe8u1ImtPWjzTHVXd5z2SmRJ98EFFZtju2mCLqqD4qUcNl3DbaPXgqy5Hm5ohVmEQlxO1jO7xq/f4n6d72noQCWTfYdXOZwD1voEc4Hox2AWP+tPx0FLRSqj3h+44selVwEObb8pxQEYmsfxVnBm2i/aOBLlsntaLQhCFjs5umLd4UDP9lvIwJYx460QX6PyHAYDMA8h9VNO/jfKp97JwtKf0Yrh3RUJ210MNkYcV5N8JBUX+KGT7fYI6FN9OX+QTXupKPQwIDAQABo3EwbzAdBgNVHQ4EFgQUvyWzocZiagOIj4tWholK1IuwGSMw TgYDVR0RBEcwRYIVc2FtbHRlc3QtNS5zeXMua3RoLnNlhixodHRwczovL3NhbWx0 ZXN0LTUuc3lzLmt0aC5zZS9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0BAQsFAAOC AQEA64IorZp5656GLTNnlBFEvegWYPQE3GW+tDMJ40lzzhY+QSpM1FIxggF2YJsT VhEWNqITZz1lcKjEycBaR8kEDatg0fgjhXrwGwVKIOqU+bZTZF5Ez8r0d9Y0DYSe kGSKCdIYung1ylHcuCFC79Ls197OHkLRwn0DNoNEld9bHdE+keipdq5oR5xjZeys cNcwYx6ss2ody6XieevUCsbMhHfzniA1V2ccK8dAmzoLCkqoeIN8HISbOCh+JN2x Iol9Vr1XBYMb8c7q8mIK7Jo8iZy3lzGL15YHnVRGw0lEIFnbyw+hs9kiKtAavwZj dYVmg1bH4O/srfw2WyZikn6tCg==","MIIDPzCCAiegAwIBAgIUYeMCRCMdVKuvBda+Hax74TXD7DMwDQYJKoZIhvcNAQEL BQAwIDEeMBwGA1UEAwwVc2FtbHRlc3QtNS5zeXMua3RoLnNlMB4XDTE3MTAyNTEx MzkzOVoXDTM3MTAyNTEyMzkzOVowIDEeMBwGA1UEAwwVc2FtbHRlc3QtNS5zeXMu a3RoLnNlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoohy1KETpXrY rVBPmtWGPWZPb3R43TkQeLJDQlu0kv0SvyCRct37Jb3/KvImabkfm1AI6vy9Gb6M tn+EwjzepbpVMUVx+ezEFPNj528rgR4nSSMIrvVHy454d12O0+2w/OxNIVo9t0uo 1lNVi65YnOskaHeUUM3wetLjyo4UAyI/queEFPVQ0BmEajx4e8yYhILVxJL8tZm2 BOkarbugqcRbUV762U+ZLQOXKQLv4zgMqBj4z1+Y4kHXukwJCOPP6UMgvsDWFWxz AMpWwqgsvCpjGrkC52ziCnC3nFEeAxQbutGH3eb3WWU5OM7akKckpbdXI+ONauT+ v5swcej7sQIDAQABo3EwbzAdBgNVHQ4EFgQUAUgE904d6fWSKtKkFD3tIH2EPJgw TgYDVR0RBEcwRYIVc2FtbHRlc3QtNS5zeXMua3RoLnNlhixodHRwczovL3NhbWx0 ZXN0LTUuc3lzLmt0aC5zZS9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0BAQsFAAOC AQEAiCqP8NZHtX8fG+qh4ZuiSdjyjHp30NmcJDhHimulBvJl4ezwk0qmZ5XHWOfL DJdbsF3v5vgL7QM5mnXOi4HI/MN18rSAC1wzT3CAhLTTutza05+x1tNkHmFrjZMl lbNcsWgO6LdXi2NuibgsmS1bLo7H4eV8PO8ktT0Ptef92iKNylWIVxJFZMU95THg QBewJeW8S8oFdMK2t+mZECIZjtj6IIKoJ6gvWGdP4LCPqaCYDk8NmJvd0gT//o9q 9ibg0by2w8nBaVU0xwm5hd08wq5IYbAYoDBwl9KQm99wMdF/XDMuWK/azqNdPO0p bVssBetFsjXTay46phzsm1HOyw=="] //, fs.readFileSync("cert-file2.crt").toString()]
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
            console.log(saml_response.user.attributes)
            res.redirect('/')
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