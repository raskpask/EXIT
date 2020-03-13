var saml2 = require('saml2-js');
const fs = require('fs');
let path = __dirname.split("\\").join("/");
const private_key = path + "/key-file.pem"
const cert = path + "/certificate.pem"
const cert1 = path + "/cert1.crt"
const cert2 = path + "/cert2.crt"
// const cert = require("/Users/molin/Desktop/EXIT/backend/net/md-signer2.crt")
const sp_options = {
    entity_id: "https://exit.ict.kth.se/",
    private_key: fs.readFileSync(private_key, "utf-8").toString(),
    certificate: fs.readFileSync(cert, "utf-8").toString(),
    assert_endpoint: "https://exit.ict.kth.se/assert",
}
const idp_options = {
    sso_login_url: "https://saml-5.sys.kth.se/idp/profile/SAML2/Redirect/SSO",
    sso_logout_url: "https://saml-5.sys.kth.se/",
    certificates: [
        "MIIDMDCCAhigAwIBAgIVAOmaIGGXK/JbzXedtKY0l3Vp34hRMA0GCSqGSIb3DQEB"+
        "CwUAMBwxGjAYBgNVBAMMEXNhbWwtNS5zeXMua3RoLnNlMB4XDTE3MTAwMjE0MDIw"+
        "M1oXDTM3MTAwMjE0MDIwM1owHDEaMBgGA1UEAwwRc2FtbC01LnN5cy5rdGguc2Uw"+
        "ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCMHtOcs0ZEBqSTA0AqMyyc"+
        "1Hhjq41rLAF+xk9LJVTVmiEzKZqbFbnFXeh4A50R0qXdWg+ZRS+57D3tIJbM4sNk"+
        "IeOS7IDFdkk3h/t7lqWrIyxrK6dHN5awqquchyjzQVZ/+tSge5iA04WYf1YqqYBl"+
        "Cdn38JoyRIIS5bS5Xo4iyrh0RE1NpNBVwL3+m6XQyDZwy/9uilAZChydlZeKkTXW"+
        "wUBPNksose/M1cbWlw3e43EC4/WViayErTijXZmp3ZFlJCL1EKPURVjeEX1AXkpM"+
        "6OaL5S7PwdrAqg9qPhEDdYYRHxEDuM8iRoAmzPCwStOo1gS6mWQqBrXvQE2ojwdH"+
        "AgMBAAGjaTBnMB0GA1UdDgQWBBTZyigFF2hva2NdXhtibyWmqToY8TBGBgNVHREE"+
        "PzA9ghFzYW1sLTUuc3lzLmt0aC5zZYYoaHR0cHM6Ly9zYW1sLTUuc3lzLmt0aC5z"+
        "ZS9pZHAvc2hpYmJvbGV0aDANBgkqhkiG9w0BAQsFAAOCAQEAGtvAY2a6PpljlGHO"+
        "J60hymreWhvUEwq1XA3IX3+ox85mnNiDGbyIM6kCQMuMXeK/wectNMDRxqPTmsLY"+
        "s7LrnP0IESqU0fJh8csy6h1bS9m5CbN1D3Frv2JS28jCUjousUrH6DDV75w2xbWb"+
        "U2trtXVk5XyBas4JdnxBSTgIRe9C26ALN2IJ4YdGwLaZbA74y0Ehcf09NSNiwrvl"+
        "O0Q8q5FCN5Zuog/y6Q8PSFLgXEo/lx2JufAFeQrLaKyJRy0sXLlXdVtdOfm6DLcW"+
        "/xpqhC24xIistMSyj3WcnUt8yWezp4xKuxzAg/A7QHJWWsmxwX5+YHYdmL9bCPYW"+
        "sIsQIQ==", 
        "MIIDLzCCAhegAwIBAgIUH2oX7WISLlGweMWZtSzUAdE7fT0wDQYJKoZIhvcNAQEL"+
        "BQAwHDEaMBgGA1UEAwwRc2FtbC01LnN5cy5rdGguc2UwHhcNMTcxMDAyMTQwMjAz"+
        "WhcNMzcxMDAyMTQwMjAzWjAcMRowGAYDVQQDDBFzYW1sLTUuc3lzLmt0aC5zZTCC"+
        "ASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK8fvkm0hukgNA45Ct1EqkA1"+
        "Qfl9+yYMawO7XuKUdWXfsHFUEwi2fMaLBQbDlGzugyAqs+VL44Ladq6jNmU0ICGv"+
        "dABuqQ1/mikC93yCn2Fyr+L8Pb6ooQva5sG1FxiSo5ODgKxUw/NJOPO3jD8oafXZ"+
        "KMe7bziyEsdK6FJQvnSKTEi/uKgoyggQaPQKhN/n9+8S7xfbKt6SElhqndNDLJO2"+
        "+rLznWzDDiVq4cYSrmvkTrOdEXge9IRw0C/fAS45pbfrrrv5p3uhoSrnGqgbmUnO"+
        "zzxtyaTMgtr8ymUg8Sg3lM1vugxMjV2iQXrcTUEpS88SJZSSZ55CKmCnbLFlT9kC"+
        "AwEAAaNpMGcwHQYDVR0OBBYEFC64tqUGgzV0tBPjchpcAKIANSurMEYGA1UdEQQ/"+
        "MD2CEXNhbWwtNS5zeXMua3RoLnNlhihodHRwczovL3NhbWwtNS5zeXMua3RoLnNl"+
        "L2lkcC9zaGliYm9sZXRoMA0GCSqGSIb3DQEBCwUAA4IBAQBoSSeExvS4jh469mls"+
        "f4+oXwOx8pimcxp4qjuuikdmMF+WiiCOto+36ZkG8X6cx6SRZYavetLMXoQdwkHn"+
        "3OiaJmK/kvG+0KlaSYq68p9u6ddKQgjWPy9JbZlW0uZQaFPg2/5O4acukImkHR/q"+
        "v7uPLS6CRVWMflLpTxZjFBnkafsw3bGjqCAh8zh7afGgmAVZjrRfcmuj6GeEc+0R"+
        "6+X1G5kC1FdSnzY6CTSxf2M4Imgy0iU1QNnby7Pqm+pxWhvPW9+x4DDCOQiZquyw"+
        "EoqFRoJQqVekIFRBNnL10DpDCIogHXd7I49hPQf35/LkZmcqvEJuGSaSVOvmFTR6"+
        "OmTq"
    ]
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
        sp.post_assert(idp, options, function (err, saml_response) {
            if (err != null) {
                console.error(err)
                return res.sendStatus(500);
            }

            // Save name_id and session_index for logout
            // Note:  In practice these should be saved in the user session, not globally.
            name_id = saml_response.user.name_id;
            session_index = saml_response.user.session_index;
            console.log(saml_response.user.attributes)
            const res = JSON.stringify(saml_response.user.attributes)
            const nameAndUsername = res.split("'urn:oid:2.5.4.3':")[1].split(',')[0].split("'")[1].split(' ')
            const first_name = nameAndUsername[0]
            const last_name = nameAndUsername[1]
            const username = nameAndUsername[2].split('(')[1].split(')')[0]
            const role = res.split("'urn:iod:1.3.6.1.4.1.5923.1.1.1.1':")[1].split(',')[0].split("'")[1]
            console.log(first_name)
            console.log(last_name)
            console.log(username)
            console.log(role)

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