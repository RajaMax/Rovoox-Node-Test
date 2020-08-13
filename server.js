
import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan';
import glob from 'glob';

//include the files 
import settings from './settings';
import connectToMongoDb from './config/database.config';
import apiRouters from './router';
import http from 'http';
const path = require("path");
let config = require('./config/' + settings.environment + '.config');
var mkdirp = require('mkdirp');

//set the port
const port = settings.port;

const app = express();

const server = http.createServer(app)

connectToMongoDb();

app.use(bodyParser.json({
    extended: true,
    limit: '500mb'
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '500mb'
}));


// app.use(express.static(path.join(__dirname, 'dist')));
app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Pass to next layer of middleware
    next();
  });
apiRouters.forEach(function (apiRoute) {
    app.use('/', apiRoute);
});

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });


server.listen(port, () => {
    console.log(`Server started on port : ${port}`);
});