"use strict";
const express = require('express');
const favicon = require('express-favicon');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const port = process.env.PORT || 80;
const app = express();




// const fs = require('fs');
// const http = require('http');
// const https = require('https');
// const key = fs.readFileSync(__dirname + '/cert/selfsigned.key');
// const cert = fs.readFileSync(__dirname + '/cert/selfsigned.crt');
// const options = {
//   key: key,
//   cert: cert,
//   ca: [
//     fs.readFileSync(__dirname + '/DigiCertCA.crt'),
//     fs.readFileSync(__dirname + '/exit_ict_kth_se.crt')
//   ]
// };

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

const apiEndpoint = require('./backend/net/apiEndpoint');
const CASLogin = require('./backend/net/CASLogin');

CASLogin.router(app);
apiEndpoint.router(app);

// For React
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

require("greenlock-express").init({
    packageRoot: __dirname,
    configDir: "./greenlock.d",
    maintainerEmail: 'jakmol@kth.se',
    cluster: false ,
    app: require('/src/app.js')
  });
  // .serve(app);

  greenlock.listen(80,443);
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(options, app);
// httpServer.listen(80);
// httpsServer.listen(443);
// const server = https.createServer(options, app);
// server.listen(port)
// app.listen(port);