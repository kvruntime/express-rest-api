const mongoose = require("mongoose");
const Joi = require("joi");

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

const customerValidator = Joi.object({
	name: Joi.string().min(5).max(50).required(),
	isGold: Joi.boolean().required().default(true),
	phone: Joi.string().required(),
});


module.exports.Customer = new mongoose.model("Customer", customerSchema);
module.exports.customerValidator = customerValidator