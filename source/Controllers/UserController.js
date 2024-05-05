const UserController = {
	createUser: async (request) => {
		try {
		} catch (error) {
			return {
				error: {
					message: 'something went wrong: ' + error.message || error,
				},
			};
		}
	},
};

module.exports = UserController;
