const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const dtos = require('../dtos/coursesdtos');

router.get('/', async (req, res) => {
  const _genres = await schemas.Genre.find().sort({ name: 1 });
  res.status(200).send(_genres);
});

router.get('/:id', async (req, res) => {
  schemas.Genre.findByIdAndUpdate(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(404).send(error.message));
});

router.post('/', (req, res) => {
  const { error, value } = dtos.genreCreateDtod.validate(req.body);

  if (error) return res.status(400).send(error.details);

  const _genre = new schemas.Genre(value);

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
  const { error, value } = dtos.genreCreateDtod.validate(req.body);

  if (error) return res.status(404).send(error.details);

  schemas.Genre.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.send(result))
    .catch((error) => res.status(404).send(error.message));
});

router.delete('/:id', (req, res) => {
  schemas.Genre.findByIdAndRemove(req.params.id)
    .then((result) => res.send(result))
    .catch((error) => res.status(404).send(error.message));
});

module.exports = router;
