var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
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
  },
  expect:{
    type:Number,
    default:1
  },
  finish:{
    type:Number,
    default:0.5
  },
  efficiency:{
    type:Number
  }
});

taskSchema.pre('save',function(next){
  var task = this;
  task.efficiency = task.finish / task.expect;
  next();
})

var Task = mongoose.model('tasks',taskSchema);


module.exports = {Task}