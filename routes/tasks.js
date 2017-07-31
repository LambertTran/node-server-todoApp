var express = require('express');
var router  = express.Router();
var mongojs = require('mongojs');

// connect to database server
var db = mongojs('mongodb://alirom93:Lamson123@ds127443.mlab.com:27443/todo_list',['tasks']);

// get all tasks
router.get('/tasks', (req, res, next) => {
	db.tasks.find((err,tasks) =>{
		if(err) {
			res.send(err);
		}
		res.json(tasks);
	});
});

// get an task using id from user input
router.get('/task/:id', (req, res, next) => {
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},(err,task) =>{
		if(err) {
			res.send(err);
		}
		res.json(task);
	});
});


//save task
router.post('/tasks', (req, res, next) => {
	var task = {
		title:req.body.title ,
		status: false
	}
	// if (!task.tittle || (task.status + '')){
	// 	res.status(400).json({
	// 		"error":"bad data"
	// 	});
	// } else {
		db.tasks.save(task,(err,task) => {
			if (err){
				res.send(err);
			}
			res.json(task);
		});
	//}
});	

// //delete task
// router.delete('/task/:id', (req, res, next) => {
// 	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},(err,task) =>{
// 		if(err) {
// 			res.send(err);
// 		}
// 		res.json(task);
// 	});
// });


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