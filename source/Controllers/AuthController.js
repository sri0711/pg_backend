const UserModel = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const AdminModel = require('../Model/AdminModel');

const AuthController = {
	login: async (request) => {
		try {
			let requestData = request?.body;
			let isAdmin = false;
			let user = await UserModel.findOne({
				$or: [{user_name: requestData?.user}, {email: requestData?.email}],
			}).lean();

			if (!user) {
				user = await AdminModel.findOne({
					$or: [{user_name: requestData?.user}, {email: requestData?.email}],
                }).lean();
                isAdmin = true;
				if (!user) {
					return {
						error: {
							message: 'User not found',
							code: 404,
						},
					};
				}
			}

			let check = bcrypt.compareSync(requestData?.password, user.password);
			if (!check) {
				return {
					error: {
						message: 'Invalid password',
						code: 401,
					},
				};
			}

			let token = jsonWebToken.sign(user, process.env.SECRET, {
				expiresIn: '12h',
			});

			return {
				message: 'Authenticated successfully',
				data: {
					name: user?.name,
					user_name: user?.user_name,
					phone: user?.phone,
					email: user?.email,
					is_admin: isAdmin,
					token: token,
				},
			};
		} catch (error) {
			return {
				error: {
					message: 'something went wrong: ' + error.message || error,
				},
			};
		}
	},
};

module.exports = AuthController;
