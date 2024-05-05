const dotEnv = require('dotenv');
dotEnv.config({path: './bin/.env'});
const clusters = require('node:cluster');
const threadsLimit = 3;

if (clusters.isPrimary) {
	for (let i = 0; i < threadsLimit; i++) {
		clusters.fork();
	}
	clusters.on('exit', () => {
		clusters.fork();
	});
	clusters.on('error', () => {
		clusters.destroy();
		clusters.fork();
	});
} else {
	require('../source/Server');
}
