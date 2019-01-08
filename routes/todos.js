var express = require('express')
var router = express.Router();
var model = require('../models')

// get todo list
router.get('/', (req, res, next)=>{
	model.Todo.findAll({})
		.then(todos => res.json({
			error: false,
			data: todos
		}))
		.catch(error=> res.json({
			error: true,
			data: [],
			error: error
		}))
});

//post todo
router.post('/', (req, res, next)=>{
	const{
		title,
		description
	} = req.body;
	model.Todo.create({
			title: title,
			description: description
		})
		.then(todo=> res.status(201).json({
			error: false,
			data: todo,
			message: 'todo has been created'
		}))
		.catch(error=> res.json({
			error: true,
			data: [],
			error: error
		}))
});

//update todo
router.put('/:id', (req, res, next)=>{
	const todo_id = req.params.id;
	const { title, description } = req.body;

	model.Todo.update({
		title: title,
		description: description
		}, {
			where: {
				id: todo_id
			}
		})
		.then(todo=>res.json({
			error: false,
			message: 'list has been updated.'
		}))
		.catch(error=> res.json({
			error: true,
			error: error
		}))
});

//delete list
router.delete('/:id', (req, res, next)=>{
	const todo_id = req.params.id;

	model.Todo.destroy({ where: {
		id: todo_id
	}})
		.then(status => res.json({
			error: false,
			message: 'list has been deleted.'
		}))
		.catch(err=>res.json({
			error: true, 
			error: error
		}))
});

module.exports = router;