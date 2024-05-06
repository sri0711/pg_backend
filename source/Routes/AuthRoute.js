const Express = require('express');
const Route = Express.Router();
const AuthController = require('../Controllers/AuthController');
const Responder = require('../App/Responder');

Route.post('/login', async (request, response) => {
	let result = await AuthController.login(request);
	return Responder(response, result);
});

module.exports = Route;
