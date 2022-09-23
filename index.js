const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const {shutdown} = require('./helper');

let server;
const PORT = process.env.PORT || 5000;

// app.use((req, res, next) => {
// 	console.log('Testing log');
// 	next();
// });

//app.use(cors());
app.use(express.json());
app.use('/todo', todoRoutes);

mongoose
	.connect(`mongodb://mongo`)
	.then(() => {
		console.log('connected to db successfully');
		server = app.listen(PORT, () => console.log(`Server listening on port ${PORT} in ${process.env.NODE_ENV} mode`));
	})
	.catch(err => console.error(err));

process
	.on('SIGTERM', () => {
		console.info('Got SIGTERM:Graceful shutdown', new Date().toISOString());
		shutdown(server);
	})
	.on('SIGINT', () => {
		console.info('Got SIGINT:Graceful shutdown', new Date().toISOString());
		shutdown(server);
	})
	.on('uncaughtException', err => {
		console.error('Uncaught Exception thrown', err);
		shutdown(server);
	})
	.on('unhandledRejection', (reason, promise) => {
		console.log('Unhandled Rejection at:', promise, 'reason:', reason);
		shutdown(server);
	});
