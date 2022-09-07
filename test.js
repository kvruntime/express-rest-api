const Joi = require("joi");

function validateCourse(course) {
  const schema = {course: Joi.string().min(3).required() }

  return Joi.valid(schema)
}


const val = validateCourse({name:"v"})
// console.log(val)
console.log(val.error())
// console.log(val.error)