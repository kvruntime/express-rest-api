const express = require("express")
const Joi = require("joi")
const models = require('../models/models');
const courseDtos = require('../dtos/coursesdtos');


const router = express.Router()
const coursService = new models.CoursService();


router.get('/', (req, res) => {
  res.send(coursService.findAllCourses());
});

router.get('/:id', (req, res) => {
  let cours = coursService.findCourse(parseInt(req.params.id));

  if (!cours) return res.status(404).send('Not found!!');
  res.send(cours);
});

router.post('/', async (req, res) => {
  const { error, value } = courseDtos.courseCreateDto.validate(req.body);

  if (error) return res.status(400).send(error.details);

  const cours = coursService.createNewCourse(value.name);
  coursService.addNewLesson(cours);
  res.send(cours);
});

router.put('/:id', (req, res) => {
  // Check existing cours
  let cours = coursService.findCourse(Number.parseInt(req.params.id));
  if (!cours) return res.status(404).send('Not found');

  // Validaton
  const { error, value } = courseDtos.courseCreateDto.validate(req.body);
  if (error) return res.status(400).send(error.details);

  // Update
  const course = value;
  res.send(course);
});

router.delete('/:id', (req, res) => {
  let cours = coursService.findCourse(parseInt(req.params.id));

  if (!cours) return res.status(404).send('Not found!!');

  coursService.deleteLesson(cours);
  res.send(cours);
});






module.exports = router