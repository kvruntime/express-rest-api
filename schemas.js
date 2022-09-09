const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
	},
	isGold: {
		type: Boolean,
		default: false,
	},
	phone: {
		type: String,
	},
});

const movieSchema = new mongoose.Schema({
	title: { type: String, minlength: 5, maxlength: 255 },
	genre: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Genre",
		required: true,
	},
	numberInStock: { type: Number, required: true, nin: 0, max: 255 },
	dailyRentalRate: { type: Number, required: true, nin: 0, max: 255 },
});

module.exports.Genre = new mongoose.model("Genre", genreSchema);
module.exports.Customer = new mongoose.model("Customer", customerSchema);
module.exports.Movie = new mongoose.model("Movie", movieSchema);
