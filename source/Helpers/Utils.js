const nano = require('nanoid');

const Utils = {
	getRandomId: (len = 7) => {
		return nano.nanoid(len);
	},
};

module.exports = Utils;