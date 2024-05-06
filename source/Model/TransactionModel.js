const TransDatabase = require('../App/Connection').transactionDatabase();

const TransSchema = TransDatabase.Schema(
	{
		transaction_id: {
			type: String,
			unique: true,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		is_card: {
			type: Boolean,
			default: false,
		},
		user_transaction_details: {
			card_number: {
				type: Number,
			},
			cvv: {
				type: Number,
			},
			exp_date: {
				type: Date,
			},
			card_type: {
				type: String,
				enum: ['credit', 'debit'],
			},
			qr_id: {
				type: String,
			},
		},
		transaction_status: {
			type: String,
			enum: ['pending', 'success', 'failed'],
		},
		settlement_id: {
			type: String,
		},
		settlement_status: {
			type: String,
			enum: ['initiated', 'pending', 'success', 'failed'],
			default: 'initiated',
		},
	},
	{
		timestamp: true,
	}
);

const TransactionModel = TransDatabase.model('transactions', TransSchema);

module.exports = TransactionModel;
