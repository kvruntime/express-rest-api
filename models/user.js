const mongoose = require('mongoose');
const Joi = require('joi');

const userValidator = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required().email(),
	password: Joi.string().min(5).required(),
});

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true,
		minlenght: 5,
		maxlength: 255,
	},
	password: {
		type: String,
		minlenght: 5,
	},
});

userSchema.methods.genAuthToken = function () {
	// TODO: use jwt to generate token bu token
	// const token = jwt.sign({}, SERVER_TOKEN)
  const token = `jwt-token ${this.email}`;
	return token;
};

module.exports.User = new mongoose.model('User', userSchema);
module.exports.userValidator = userValidator;
