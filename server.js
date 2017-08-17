const express = require('express');
const {MongoClient} = require ('mongodb');
const mongoose= require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

var mongojs = require('mongojs');
var router  = express.Router();
var server = http.createServer(app);


/** define port and express */
var app = express();
var port= process.env.PORT || 3000;


/** allow cross origin access */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/** connect to database server*/
var db = mongojs('mongodb://alirom93:Lamson123@ds127443.mlab.com:27443/todo_list',['tasks']);


/** connect to routes */
var index = require('./routes/index');
var tasks = require('./routes/tasks');
var users = require('./routes/users');


/** parser incoming data to JSON */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/** set static folder and render index.html */
app.use(express.static(path.join(__dirname,'views')));
app.use('/',index); // home page
app.use('/api',tasks); // api page
app.use('/api',users);


/** connect to server */
app.listen(port, () => {
  console.log('connected to server');
});

