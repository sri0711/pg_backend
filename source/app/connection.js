const connection = {
	establish: (app) => {
		app.listen(3000, () => {
			console.log('application started on http://localhost:3000');
		});
	},
};

module.exports = connection;
