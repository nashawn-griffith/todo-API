'use strict';
const todoRouter = require('express').Router();
const Todo = require('../models/todoModel');
const {responses} = require('../helper');

//Get all Todo Items
todoRouter.get('/lists', async (req, res) => {
	//
	const LIMIT = 10;
	let skipCount = 0; //page-1 * limit

	if (req.query?.page) skipCount = (Number(req.query.page) - 1) * LIMIT;

	try {
		const todoItems = await Todo.find().select('title status _id').skip(skipCount).limit(LIMIT);

		if (todoItems.length === 0) {
			const {statusCode, message} = responses.NO_CONTENT;
			return res.status(statusCode).json({body: message});
		}

		const {statusCode} = responses.SUCCESS;
		return res.status(statusCode).json({body: todoItems});
	} catch (err) {
		const {statusCode, message} = responses.SERVER_ERROR;
		console.error(err);
		return res.status(statusCode).json({body: message});
	}
});

//Get a single Todo Item
todoRouter.get('/list/:id', async (req, res) => {
	try {
		const {id} = req.params;

		const existingTodo = await Todo.findById(id).select('title status');

		if (!existingTodo) {
			const {statusCode, message} = responses.NOT_FOUND;
			return res.status(statusCode).json({body: message});
		}

		const {statusCode} = responses.SUCCESS;
		return res.status(statusCode).json({body: existingTodo});
	} catch (err) {
		console.error(err);
		return res.status(500).json({body: 'Something Went Wrong'});
	}
});

//Add a Todo Item
todoRouter.post('/add', async (req, res) => {
	let body = {
		title: req.body.data,
		status: true,
	};

	console.log('item added successfully');

	try {
		const newTodo = await Todo.create(body);
		return res.json(newTodo);
	} catch (err) {
		console.error(err);
		return res.send('Something went wrong');
	}
});

//Update an item - TODO

//Delete a Todo Item
todoRouter.delete('/delete/:id', async (req, res) => {
	try {
		const {id} = req.params;

		const result = await Todo.findByIdAndDelete(id).select('_id title status');
		console.log(result);

		const {statusCode} = responses.SUCCESS;

		return res.status(statusCode).json({body: result});
	} catch (err) {
		const {statusCode, message} = responses.SERVER_ERROR;
		console.error(err);
		return res.status(statusCode).json({body: message});
	}
});

module.exports = todoRouter;
