const express = require("express");
const router = express.Router();
const _ = require("lodash")
const bcrypt = require("bcrypt")
const { User, userValidator } = require("../models/user");

// router.get("/", (req, res) => {
// 	res.send("Getting all users");
// });

router.post("/", async (req, res) => {
	const { error, value } = userValidator.validate(req.body);

	if (error) return res.status(400).send(error.details);

	let user = await User.findOne({ email: value.email });
  console.log(user)

	if (user) return res.status(400).send("User already existed!!");

	user = new User(value);
  // TODO: use bycrypt to hasn user password before save user informations
	user.password = await bcrypt.hash(user.password, await bcrypt.genSalt())
	await user.save();

  // TODO: use lodash to pick information to send to client
	res.send(_.pick(user, ['name', 'email']));
  const token = user.genAuthToken()
	res.header("x-auth-token", token).send(user);
});

module.exports = router;
