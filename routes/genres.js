const express = require('express');
const router = express.Router();
const {Genre, genreValidator} = require("../models/genre")

router.get('/', async (req, res) => {
  const _genres = await Genre.find().sort({ name: 1 });
  res.status(200).send(_genres);
});

router.get('/:id', async (req, res) => {
  Genre.findByIdAndUpdate(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(404).send(error.message));
});

router.post('/', (req, res) => {
  const { error, value } = genreValidator.validate(req.body);

  if (error) return res.status(400).send(error.details);

  const _genre = new Genre(value);

  _genre
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

router.put('/:id', (req, res) => {
  const { error, value } = genreValidator.validate(req.body);

  if (error) return res.status(404).send(error.details);

  Genre.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => res.status(404).send(error.message));
});

router.delete('/:id', (req, res) => {
  Genre.findByIdAndRemove(req.params.id)
    .then((result) => res.send(result))
    .catch((error) => res.status(404).send(error.message));
});

module.exports = router;
