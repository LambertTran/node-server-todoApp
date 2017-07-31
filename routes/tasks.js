var express = require('express');
var router  = express.Router();
var mongojs = require('mongojs');
const mongoose= require('mongoose');
/** Import model */
var {Task} = require('../models/task');


/** connect to database server */
var db = mongojs('mongodb://alirom93:Lamson123@ds127443.mlab.com:27443/todo_list',['tasks']);


/** return all tasks */
router.get('/tasks', (req, res, next) => {
	db.tasks.find((err,tasks) =>{
		if(err) {
			res.send(err);
		}
		res.json(tasks);
	});
});


/** return an task using id from user input */
router.get('/tasks&id=:id', (req, res, next) => {
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err,task) =>{
		
		if(err) {
			res.send(err);
		}		
		res.json(task);
	});
});


/** save task from user input */
router.post('/tasks', (req, res, next) => {
	
	// create an intant variable
	var task = new Task ({
		"title": req.body.title
	});

	db.tasks.save(task,(err,task) => {
		
		if (err){
			res.send(err);
		}	
		res.json(task);
	});
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
router.delete('/tasks&delete=all',(req,res,next) => {
	db.tasks.remove({},(err,task) => {
		
		if (err) {
			res.send(err)
		}
		res.json(task);
	});
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