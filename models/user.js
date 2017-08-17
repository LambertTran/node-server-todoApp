var mongoose = require('mongoose');

var User = mongoose.model('users',{
  email:{
    type:String,
    required:true,
    trim: true
  },
  password:{
    type:String,
    required:true,
    trim:true,
    minlength:6
  },
  tokens:[{
    access:'auth',
    token:String
  }]
})

module.exports = {User}