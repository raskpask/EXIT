const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        proxy({
            // target: 'http://130.237.202.87:8080/',
            target: 'http://localhost:8080/',
            changeOrigin: true,
        })
    );
};