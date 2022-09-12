const config = require("config")
const mongoose = require('mongoose');
module.exports = function () {
	mongoose
		.connect(config.get("dbUrl"))
		.then(() => {
			console.log('applicaiton connected to database...!');
		})
		.catch();
};
