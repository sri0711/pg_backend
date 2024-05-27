const Express = require('express');
const Route = Express.Router();
const Responder = require('../App/Responder');
const AdminController = require('../Controllers/AdminController');

Route.post('/list', async (request, response) => {
	let result = await AdminController.list(request);
	return Responder(response, result);
});

module.exports = Route;
