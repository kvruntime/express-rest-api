const Joi = require("joi")

const courseCreateDto = Joi.object({
  name: Joi.string().min(3).required(),
});

module.exports.courseCreateDto = courseCreateDto