const PgDatabase = require('../App/Connection').paymentGateWayDatabase();

const userSchema = PgDatabase.Schema(
	{
		user_id: {
			type: String,
			unique: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			default: '',
		},
		phone: {
			country: {
				type: String,
				default: '91',
			},
			number: {
				type: String,
				default: '',
			},
		},
		password: {
			type: String,
			default: '',
		},
		verification_code: {
			type: String,
			default: '',
		},
	},
	{
		timestamp: true,
		_id: false,
	}
);

const UserModel = PgDatabase.model('users', userSchema);

module.exports = UserModel;
