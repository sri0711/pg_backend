const PgDatabase = require('../App/Connection').paymentGateWayDatabase();

const adminSchema = PgDatabase.Schema(
	{
		admin_id: {
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
		role: {
			type: String,
			enum: ['admin', 'tl', 'engineer'],
			required: true,
		},
	},
	{
		timestamp: true,
	}
);

const AdminModel = PgDatabase.model('admin', adminSchema);

module.exports = AdminModel;
