const express = require('express');
const router = express.Router();

const schemas = require('../schemas');
const dtos = require('../dtos');

router.get('/', async (req, res) => {
  schemas.Customer.find()
    .sort({ name: 1 })
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(400).send(error.message));
});

router.post('/', (req, res) => {
  const { error, value } = dtos.customerCreateDto.validate(req.body);

  if (error) return res.status(400).send(error.details);

  const _customer = new schemas.Customer(value);

  _customer
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
