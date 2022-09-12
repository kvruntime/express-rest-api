const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, userValidator } = require('../models/user');
const auth = require('../middleware/auth');

// NOTE: this route allow us to get information about the current logged user
router.get('/me', auth, async (req, res) => {
	const me = await User.findById( req.user._id).select("-password")
	res.send(me)
});

router.post('/', async (req, res) => {
	const { error, value } = userValidator.validate(req.body);

	if (error) return res.status(400).send(error.details);

	let user = await User.findOne({ email: value.email });
	console.log(user);

	if (user) return res.status(400).send('User already existed!!');

	user = new User(value);
	user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
	await user.save();

	res.send(_.pick(user, ['name', 'email']));
	const token = user.genAuthToken();
	res.header('x-auth-token', token).send(user);
});

module.exports = router;
