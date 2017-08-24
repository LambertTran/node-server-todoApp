var express = require('express');
var router  = express.Router();
const mongoose= require('mongoose');
const mongodb = require('mongodb');

/** Import model */
var {Task} = require('../models/task-model');
var {authentication} = require('./middleware/authentication');

/** connect to database server */
const URL = 'mongodb://alirom93:Lamson123@ds127443.mlab.com:27443/todo_list';
mongoose.connect(URL,['tasks']);


/** return all tasks */
router.get('/tasks', authentication,(req, res) => {

  // find user with coresponding _id
  Task.find({
    creator:req.user._id
  })
  .then((task) =>{
    res.status(200).send(task);
  }, (err) => {
    res.status(400).send(task);
  });
})

/** return an task using id from user input */
// router.get('/tasks/:id', authentication, (req, res) => {
//   // Task.findOne({
//   //   _id: req.params.id
//   // }).then((task) =>{
//   //     task.aggregate(
//   //     [
//   //       {$group: {$divide:["$expect","$finish"] }}
//   //     ]
//   //     );
//   //     res.send(task);
//   //   })

//   db.
// });


/** Create new task */
router.post('/tasks',authentication, (req, res) => {

  // create an intant variable
  var newTask = new Task ({
    "title": req.body.title,
    "creator":req.user._id
  });

  //save new task to database
  newTask.save().then((task) => {
    res.status(200).send(task);
  },(err)=>{
    res/status(400).send(err);
  })
});


/** delete a single task with corresponding id */
router.delete('/tasks/:id',authentication,(req, res) => {
  Task.remove({_id:req.params.id}).then((task) =>{
    res.status(200).send({
      _id:req.params.id
    });
  }, (err) => {
    res.status(400).send(task);
  });
});


/** delete all task*/
// router.delete('/tasks&delete=all',authentication,(req,res) => {
//   Task.remove({
//     creator:req.user._id
//   })
//   .then((task) => {
//     res.status(200).send(task);
//   },(err) => {
//     res.status(400).send(err);
//   })
// });


/** update tasks */
router.put('/tasks/:id', authentication,(req, res) => {
  Task.findByIdAndUpdate({_id:req.params.id},
  {
    $set:{ complete:true}
  }
  ,{new:true}, function(err,task) {
    if (err) {
      res.status(400).send(err)
    }
    else {
      res.status(200).send(task);
    }
  });
});


module.exports = router;