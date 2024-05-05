const PaymentGateWayDatabase = require('mongoose');
const TransactionDatabase = require('mongoose');

const connection = {
	paymentGateWayDatabase: () => {
		PaymentGateWayDatabase.connect(process.env.PG_DB, {
			UseUnifiedTopology: true,
		});
		PaymentGateWayDatabase.set('debug', true);
		return PaymentGateWayDatabase;
	},
	transactionDatabase: () => {
		TransactionDatabase.connect(process.env.TRANSACTION_DB, {
			UseUnifiedTopology: true,
		});
		TransactionDatabase.set('debug', true);
		return TransactionDatabase;
	},
	establish: (app) => {
		app.listen(process.env.PORT || 3000, () => {
			console.log(`application started on http://localhost:${process.env.PORT || 3000}`);
		});
	},
};

module.exports = connection;
