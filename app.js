require('dotenv').config();
const debug = require("debug")("app:startup")
const config = require('config');
const middlewares = require('./models/middlewares');
const express = require('express');
const users = require("./routes/courses")
const home = require("./routes/home")
const app = express();

app.set("view engine", "pug")
// app.set("views", "./views")

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value1&key=value2
// app.use(express.static('public'));

// Middlewares
app.use(middlewares.logger);
app.use(middlewares.authenticater);

// Routes
app.use("/", home)
app.use("/api/courses", users)

// Logging
debug(config.get('name'));
debug(config.get('mail.host'));
debug(config.get('mail.password'));



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port...${port}`);
});
