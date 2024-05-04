require('express-async-errors');

// program import sections
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
// const booleanParser = require('boolean-parser');

// server setup initialization
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
	cors({
		origin: '*',
	})
);
app.use(morgan('dev'));

// Route Configurations

//  global route handler
app.use('*', (request, response) => {
	return response.status(404).send({
		status: false,
		message: 'invalid route or method',
	});
});

// global error handlers
app.use((error, request, response) => {
	if (error) {
		return response.status(500).send({
			status: false,
			message: 'Something went wrong',
		});
	}
});

require('./app/connection').establish(app);
