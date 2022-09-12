const mongoose = require('mongoose');
module.exports = function () {
	mongoose
		.connect(process.env.VIDLY_DB_URL)
		.then(() => {
			console.log('applicaiton connected to database...!');
		})
		.catch();
};
