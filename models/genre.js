const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});

const genreValidator = Joi.object({
	name: Joi.string().min(5).max(50).required(),
});

module.exports.Genre = new mongoose.model("Genre", genreSchema);
module.exports.genreValidator = genreValidator;
