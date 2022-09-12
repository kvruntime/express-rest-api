const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

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
	idSuperUser: { type: Boolean, default: false },
});

userSchema.methods.genAuthToken = function () {
	const token = jwt.sign(
		{ _id: this._id, email: this.email, isSuperUser:this.isSuperUser },
		config.get('jwtPrivateKey')
	);
	return token;	
};

module.exports.User = new mongoose.model('User', userSchema);
module.exports.userValidator = userValidator;
