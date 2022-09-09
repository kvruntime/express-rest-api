const Joi = require("joi")

const courseCreateDto = Joi.object({
  name: Joi.string().min(3).required(),
});


const genreCreateDto = Joi.object({
  name:Joi.string().min(5).max(50).required()
})

module.exports.courseCreateDto = courseCreateDto
module.exports.genreCreateDtod = genreCreateDto