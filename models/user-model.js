/**===========================================

                IMPORT PACKAGE

**===========================================*/

// database package
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// hasking password and json-web-token
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// modify user returning data
const _ = require ('lodash');

/**===========================================

              Body of User Model

**===========================================*/

/** user model */
var UserSchema = new Schema({
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
    access:String,
    token:String
  }]
})

/** hash password and store into data base */
UserSchema.pre('save',function(next) {
  // point at current user
  var user = this;

  //check if user password was modified
  //if it was modified, hash and store password 
  //into data base
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt) => {
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password=hash;
        next();
      })
    })
  } else {
    next();
  }
})


/** Modify user returning data when called */
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject,['email','_id']);
}


/** Generate Token */
UserSchema.methods.generateToken = function() {
  // point at current user
  var user = this;

  // define access key
  var access= 'auth';

  // generate token with user._id and access key
  var token = jwt.sign({_id:user._id.toHexString(),access},'randomKey').toString();

  // add token and access to user.tokens
  user.tokens.push({access,token});

  // update and return user
  return user.save().then(() => {
    return token;
  })
}


/** find user when giving email and password */
UserSchema.statics.findByCredentials = function(email,password){
  var User = this;

  // first find user with email
  return User.findOne({email}).then((user) => {
    // if there is no user, reject access
    if(!user){
      console.log(yes);
      return Promise.reject();
    }
    // if there is user, compare inputed password with user.password
    return new Promise((resolve,reject) => {
      bcrypt.compare(password,user.password,(err,res) => {
        if(res){
          resolve(user);
        } else{
          reject();
        }
      });
    });
  });
}


/** Find user using token */
UserSchema.statics.findByToken = function(token){
  var user = this;
  var decodedToken;

  // try to decode the token with the key
  try {
    decodedToken=jwt.verify(token,'randomKey');
  }catch(err){
    return Promise.reject();
  }

  // find user with decodedToken
  return user.findOne({
    '_id':decodedToken._id,
    'tokens.access': decodedToken.access,
    'tokens.token':token
  });
}



/** create user model from schema */
var User = mongoose.model('users',UserSchema)
module.exports = {User}