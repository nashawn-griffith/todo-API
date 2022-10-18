'use strict';
exports.shutdown = server => {
	server.close(err => {
		if (err) {
			console.error(`Error during shutdown`);
			process.exit(1);
		}
		console.log(`Successful Shutdown`);
		process.exit(0);
	});
};

exports.responses = {
	NO_CONTENT: {
		statusCode: 204,
		message: 'No Items Found',
	},
	BAD_REQUEST: {
		statusCode: 400,
		message: 'Bad Request',
	},
	NOT_FOUND: {
		statusCode: 404,
		message: 'Item Not Found',
	},
	SERVER_ERROR: {
		statusCode: 500,
		message: 'Internal Server Error',
	},
	SUCCESS: {
		statusCode: 200,
	},
};
