const express = require("express");
const router = express.Router();
const { moviesCreateDto } = require("../dtos");
const { Movie } = require("../schemas");

router.get("/", async (req, res) => {
	Movie.find()
		.populate("genre")
		.then((result) => res.status(200).send(result))
		.catch((error) => res.status(400).send(error.message));
});

router.post("/", (req, res) => {
	const { error, value } = moviesCreateDto.validate(req.body);

	if (error) return res.status(400).send(error.details);

	new Movie(value)
		.save()
		.then((result) => res.send(result))
		.catch(e=>res.status(400).send(e.message));
});

module.exports = router;