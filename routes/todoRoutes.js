const todoRouter = require('express').Router();
const Todo = require('../models/todoModel');

todoRouter.get('/lists', async (req, res) => {
	try {
		const todoItems = await Todo.find().select('title status');

		if (todoItems.length === 0) {
			return res.status(204).json({body: 'No Todo Items Found'});
		}
		return res.json(todoItems);
	} catch (err) {
		console.error(err);
		return res.send('Something went wrong');
	}
});

todoRouter.get('/list/:id', async (req, res) => {
	try {
		if (!req.params.id) return res.status(400).json({body: 'Bad Request !! Please specify an ID'});
		const {id} = req.params;

		const existingTodo = await Todo.findById(id).select('title status');
		return res.status(200).json({body: existingTodo});
	} catch (err) {
		console.error(err);
		return res.status(500).json({body: 'Something Went Wrong'});
	}
});

todoRouter.post('/add', async (req, res) => {
	let body = {
		title: 'third item',
		status: true,
	};

	try {
		const newTodo = await Todo.create(body);
		return res.json(newTodo);
	} catch (err) {
		console.error(err);
		return res.send('Something went wrong');
	}
});

module.exports = todoRouter;
