const PgDatabase = require('../App/Connection').paymentGateWayDatabase();
const bcrypt = require('bcrypt');

const userSchema = new PgDatabase.Schema(
	{
		user_id: {
			type: String,
			unique: true,
			required: true,
		},
		user_name: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
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
	}
);

userSchema.pre('save', async function (next) {
	let salt = bcrypt.genSaltSync(8);
	this.password = bcrypt.hashSync(this.password, salt);
	return next();
});

const UserModel = PgDatabase.model('users', userSchema);

module.exports = UserModel;
