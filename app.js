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

app.get("/", (req, res) => {
  res.send("Hello Guys!!");
});

app.get("/api/courses", (req, res) => {
  res.send(lessons);
});

app.get("/api/courses/:id", (req, res) => {
  let cours = lessons.find((c) => c.id === parseInt(req.params.id));

  if (!cours) {
    res.status(404).send("Not found!!");
  }

  res.send(cours);
});

app.post("/api/courses", (req, res) => {
  if (!req.body.name || req.body.name.lenght < 3) {
    res.status(400).send("Name required");
  }

  const cours = models.CoursService.createNewCourse(req.body.name);
  lessons.push(cours);

  res.send(cours);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port...${port}`);
});
