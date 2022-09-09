const Joi = require('joi');

const courseCreateDto = Joi.object({
  name: Joi.string().min(3).required(),
});

const genreCreateDto = Joi.object({
  name: Joi.string().min(5).max(50).required(),
});


const customerCreateDto = Joi.object({
  name: Joi.string().min(5).max(50).required(),
  isGold: Joi.boolean().required().default(true),
  phone: Joi.string().required(),
});

module.exports.courseCreateDto = courseCreateDto;
module.exports.genreCreateDto = genreCreateDto;
module.exports.customerCreateDto = customerCreateDto;
