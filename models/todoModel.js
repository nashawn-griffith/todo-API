const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
	title: {type: String, required: true},
	status: {type: Boolean, default: false},
	created: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Todo', todoSchema);
