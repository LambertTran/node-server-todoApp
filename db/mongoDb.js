var mongoose = require('mongoose');
const URL = 'mongodb://todouser:dev123@ds157097.mlab.com:57097/todo-db';
const todoDB = mongoose.createConnection(URL,{useMongoClient: true});

module.exports = todoDB;