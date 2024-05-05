require('express-async-errors');

// program import sections
const Express = require('express');
const Helmet = require('helmet');
const Cors = require('cors');
const Morgan = require('morgan');
// const booleanParser = require('boolean-parser');

// server setup initialization
const App = Express();
App.use(Express.json());
App.use(Helmet());
App.use(
	Cors({
		origin: '*',
	})
);
App.use(Morgan('dev'));

// Route Configurations
App.use('/api/users/', require('./Routes/UserRoute'));

//  global route handler
App.use('*', (request, response) => {
	return response.status(404).send({
		status: false,
		message: 'invalid route or method',
	});
});

// global error handlers
App.use((error, request, response) => {
	if (error) {
		return response.status(500).send({
			status: false,
			message: 'Something went wrong',
		});
	}
});

require('./App/Connection').establish(App);
