const AdminModel = require('../Model/AdminModel');

const AdminController = {
	list: async () => {
		try {
			let admin = await AdminModel.find().lean();
			return {
				message: 'Admin list',
				data: admin
			};
		} catch (error) {
			return {
				error: {
					message: 'something went wrong: ' + error.message || error
				}
			};
		}
	}
};

module.exports = AdminController;
