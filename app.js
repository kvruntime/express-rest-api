require('dotenv').config();
const Joi = require('joi');
const config = require('config');
const middlewares = require('./models/middlewares');
const express = require('express');
const models = require('./models/models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value1&key=value2
app.use(express.static('public'));

app.use(middlewares.logger);
app.use(middlewares.authenticater);

const coursService = new models.CoursService();

// Logging
console.log(config.get("name"))
console.log(config.get("mail.host"))
console.log(config.get("mail.password"))

// Dto
const courseCreateDto = Joi.object({
  name: Joi.string().min(3).required(),
});

app.get('/', (req, res) => {
  res.send('Hello Guys!!');
});

app.get('/api/courses', (req, res) => {
  res.send(coursService.findAllCourses());
});

app.get('/api/courses/:id', (req, res) => {
  let cours = coursService.findCourse(parseInt(req.params.id));

  if (!cours) return res.status(404).send('Not found!!');
  res.send(cours);
});

app.post('/api/courses', async (req, res) => {
  const { error, value } = await courseCreateDto.validate(req.body);

  if (error) return res.status(400).send(error.details);

  const cours = coursService.createNewCourse(value.name);
  coursService.addNewLesson(cours);
  res.send(cours);
});

app.put('/api/courses/:id', (req, res) => {
  // Check existing cours
  let cours = coursService.findCourse(Number.parseInt(req.params.id));
  if (!cours) return res.status(404).send('Not found');

  // Validaton
  const { error, value } = courseCreateDto.validate(req.body);
  if (error) return res.status(400).send(error.details);

  // Update
  const course = value
  res.send(course)
});

app.delete('/api/courses/:id', (req, res) => {
  let cours = coursService.findCourse(parseInt(req.params.id));

  if (!cours) return res.status(404).send('Not found!!');

  coursService.deleteLesson(cours);
  res.send(cours);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port...${port}`);
});
