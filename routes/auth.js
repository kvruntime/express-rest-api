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

	if (error) return res.status(400).send(error.details);

	const user = await User.findOne({ email: value.email });
	if (!user) return res.status(400).send("Email not found!!!");

	const isValid = await bcrypt.compare(value.password, user.password)
	if (!isValid) return res.status(400).send("Invalid password!!!");

	// After user validation
	console.log(user)
  const token = user.genAuthToken();
	res.header("x-auth-token", token).send(true)
});

module.exports = router;
