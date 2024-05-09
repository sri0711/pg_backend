const PaymentGateWayDatabase = require('mongoose');
const TransactionDatabase = require('mongoose');

const connection = {
	paymentGateWayDatabase: () => {
		PaymentGateWayDatabase.connect(process.env.PG_DB);
		PaymentGateWayDatabase.set('debug', true);
		return PaymentGateWayDatabase;
	},
	transactionDatabase: () => {
		TransactionDatabase.connect(process.env.TRANSACTION_DB);
		TransactionDatabase.set('debug', true);
		return TransactionDatabase;
	},
	establish: (app) => {
		let paymentGateWayDatabaseCheck = false;
		let transactionDatabaseCheck = false;
		let serverSleep = true;

		PaymentGateWayDatabase.connection.on('connected', () => {
			console.log('paymentGateWayDatabase connection established');
			paymentGateWayDatabaseCheck = true;
			app.emit('start');
		});

		TransactionDatabase.connection.on('connected', () => {
			console.log('TransactionDatabase connection established');
			transactionDatabaseCheck = true;
			app.emit('start');
		});

		app.on('started', () => {
			serverSleep = false;
		});

		app.on('start', () => {
			if (serverSleep && paymentGateWayDatabaseCheck && transactionDatabaseCheck) {
				app.listen(process.env.PORT || 3000, () => {
					app.emit('started');
					console.log(`application started on http://localhost:${process.env.PORT || 3000}`);
				});
			}
		});
	},
};

module.exports = connection;
