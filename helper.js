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
