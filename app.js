require("dotenv").config();
const Joi = require("joi");
const express = require("express");
const models = require("./models");

const app = express();
app.use(express.json());

let lessons = models.CoursService.createCourses(
  "math",
  "physics",
  "svt",
  "dev",
  "sql",
  "Python"
);

function validateCourse(course) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.valid(course, schema);
}

app.get("/", (req, res) => {
  res.send("Hello Guys!!");
});

app.get("/api/courses", (req, res) => {
  res.send(models.CoursService.lessons);
});

app.get("/api/courses/:id", (req, res) => {
  let cours = models.CoursService.findCourseById(parseInt(req.params.id));

  if (!cours) return res.status(404).send("Not found!!");
  res.send(cours);
});

app.post("/api/courses", (req, res) => {
  // const { error } = validateCourse(req.body);
  console.log("validation");
  console.log(validateCourse(req.body));

  if (error) return res.status(400).send(error);

  const cours = models.CoursService.createNewCourse(req.body.name);
  lessons.push(cours);
  res.send(cours);
});

app.put("/api/courses/:id", (req, res) => {
  // Check existing cours
  let cours = models.CoursService.findCourseById(Number.parseInt(req.params.id));
  if (!cours) return res.status(404).send("Not found");

  // Validaton
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error);
  // Update
});

app.delete("/api/courses/:id", (req, res) => {
  let cours = models.CoursService.findCourseById(parseInt(req.params.id));

  if (!cours) return res.status(404).send("Not found!!");
  models.CoursService.deleteLesson(cours)
  res.send(cours);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port...${port}`);
});
