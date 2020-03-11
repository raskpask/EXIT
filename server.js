const express = require('express');
const favicon = require('express-favicon');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const port = process.env.PORT || 80;
const app = express();
// const cors = require('cors');
// app.use(cors());
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
app.listen(port,'130.237.202.87');