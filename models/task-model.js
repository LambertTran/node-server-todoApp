/**===========================================
                Import package
**===========================================*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;



/**===========================================
              Body of User Model
**===========================================*/
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

/** save efficiency to user database */
taskSchema.pre('save',function(next){
  var task = this;
  if(task.isModified('finish')){
    task.efficiency = task.finish / task.expect; 
  }
  next();
})

var Task = mongoose.model('tasks',taskSchema);


module.exports = {Task}