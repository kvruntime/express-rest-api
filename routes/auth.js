// use auth/login while auth is the most common
const jwt = require("jsonwebtoken")
const express = require("express");
const Joi = require("joi");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt")

const authValidator = Joi.object({
	email: Joi.string().required().email(),
	password: Joi.string().required(),
});

router.post("/", async (req, res) => {
	console.log("authenticating...!");
	const { error, value } = authValidator.validate(req.body);

	// Check for validation
	if (error) return res.status(400).send(error.details);

	// Check for user existance
	const user = await User.findOne({ email: value.email });
	if (!user) return res.status(400).send("Email not found!!!");

	// TODO: use bycrypt here to check user's password validity
	const isValid = await bcrypt.compare(value.password, user.password)
	if (!isValid) return res.status(400).send("Invalid password!!!");

	// After user validation
  // TODO: use jwt to create token & send to client
  // const token = jwt.sign({}, SERVER_TOKEN)
  const token = user.genAuthToken();
	res.header("x-auth-token", token).send(true)
});

module.exports = router;
