const express = require("express");
const router = express.Router();

const { Customer, customerValidator } = require("../models/customer");

router.get("/", async (req, res) => {
	Customer.find()
		.sort({ name: 1 })
		.then((result) => res.status(200).send(result))
		.catch((error) => res.status(400).send(error.message));
});

router.post("/", (req, res) => {
	const { error, value } = customerValidator.validate(req.body);

	if (error) return res.status(400).send(error.details);

	new Customer(value)
		.save()
		.then((result) => {
			console.log(result);
			res.send(result);
		})
		.catch((error) => {
			console.log(error.message);
		});
});

module.exports = router;
