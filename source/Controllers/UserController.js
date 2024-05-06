const Utils = require('../Helpers/Utils');
const UserModel = require('../Model/UserModel');

const UserController = {
	createUser: async (request) => {
		try {
			let requestData = request?.body;

			let existCheck = await UserModel.findOne({
				$or: [
					{
						user_name: requestData.user_name,
					},
					{
						email: requestData.email,
					},
				],
			});

			if (existCheck) {
				return {
					error: {
						message: 'User already exists',
						status: 401,
					},
				};
			}

			let userData = {
				user_id: Utils?.getRandomId(),
				user_name: requestData?.user_name,
				name: requestData?.name,
				email: requestData?.email,
				phone: {
					country: requestData?.phone?.country || '91',
					number: requestData?.phone?.number,
				},
				password: requestData?.password,
			};

			let user = new UserModel(userData);
			await user.save();
			return {
				message: 'User created successfully',
			};
		} catch (error) {
			return {
				error: {
					message: 'something went wrong: ' + error.message || error,
				},
			};
		}
	}
};

module.exports = UserController;
