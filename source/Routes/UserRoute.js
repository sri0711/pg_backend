const Express = require('express');
const Route = Express.Router();
const UserController = require('../Controllers/UserController');
const Responder = require('../App/Responder');

Route.post('/create', async (request, response) => {
	let result = await UserController.createUser(request);
	return Responder(response, result);
});

Route.post('/list', async (request, response) => {
	let result = await UserController.list(request);
	return Responder(response, result);
});

module.exports = Route;
