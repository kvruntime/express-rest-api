'use strict';
require('dotenv').config();
const debug = require('debug')('app:startup');
const mongoose = require('mongoose');
const config = require('config');
const middlewares = require('./models/middlewares');
const express = require('express');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');
// const Fawn = require("fawn");

const app = express();
mongoose.connect(process.env.APP_DB_URL).then(() => {
	console.log('applicaiton connected to database...!');
});

// Fawn.init(mongoose);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value1&key=value2
app.use(express.static('public'));

// Middlewares
app.use(middlewares.logger);
app.use(middlewares.authenticater);

// Routes
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Logging
debug(config.get('name'));
debug(config.get('mail.host'));
debug(config.get('mail.password'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port...${port}`);
});

// try {
// 	new Fawn.Task()
// 	// .save("customers", new )
// 	// .update("")
// 	.run();
// } catch (e) {
// 	console.log(e.message)
// }
