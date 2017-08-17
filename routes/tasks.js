var express = require('express');
var router  = express.Router();
const mongoose= require('mongoose');


/** Import model */
var {Task} = require('../models/task-model');
var {authentication} = require('./middleware/authentication');

/** connect to database server */
mongoose.connect('mongodb://alirom93:Lamson123@ds127443.mlab.com:27443/todo_list',['tasks']);


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
// router.get('/tasks&id=:id', (req, res, next) => {
// db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err,task) =>{
//   if(err) {
//     res.send(err);
//   }
//   res.json(task);
//   });
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
router.delete('/tasks&delete=one&id=:id', (req, res, next) => {
  db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},(err,task) =>{
    if(err) {
      res.send(err);
    }
    res.json(task);
  });
});


/** delete all task*/
router.delete('/tasks&delete=all',authentication,(req,res) => {
  Task.remove({
    creator:req.user._id
  })
  .then((task) => {
    res.status(200).send(task);
  },(err) => {
    res.status(400).send(err);
  })
  
});

// // update tasks
// router.put('/task/:id', (req, res, next) => {
// 	var task = req.body;
// 	var updateTask = {};

// 	if (task.status){
// 		updateTask.status = task.status;
// 	}

// 	if (task.title){
// 		updateTask.title = task.title;
// 	}

// 	if(!updateTask){
// 		res.status(400).json({
// 			"error":"bad data"
// 		});
// 	} else {
// 		db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updateTask,{},(err,task) =>{
// 			if(err) {
// 				res.send(err);
// 			}
// 			res.json(task);
// 		});
// 	}

// });


module.exports = router;