var express = require('express');
var router  = express.Router();
var mongojs = require('mongojs');
const mongoose= require('mongoose');


/** Import model */
var {Task} = require('../models/user');

/** connect to database server */
var db = mongojs('mongodb://alirom93:Lamson123@ds127443.mlab.com:27443/todo_list',['users']);


/** create new user */
