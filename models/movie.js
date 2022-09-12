const mongoose = require("mongoose");
const Joi = require("joi");

const movieValidator = Joi.object({
	title: Joi.string().min(5).max(255).required(),
	genre: Joi.string().required(),
	numberInStock: Joi.number().min(0).max(255).required(),
	dailyRentalRate: Joi.number().min(0).max(255).required(),
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
module.exports.Movie = new mongoose.model("Movie", movieSchema);
module.exports.movieValidator=movieValidator