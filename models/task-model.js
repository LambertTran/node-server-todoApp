var mongoose = require('mongoose');

var Task = mongoose.model('tasks', {
  creator:{
    type:String,
    required:true
  },
  title: {
    type:String,
    required: true,
    trim:true,
    minlength:1
  },
  complete:{
    type:Boolean,
    default:false
  }
});

module.exports = {Task}