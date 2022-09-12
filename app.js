'use strict';
require('dotenv').config();
const express = require('express');

const app = express();
require('./startup/routes')(app);
require('./startup/middlewares')(app);
require('./startup/db')();
require('./startup/validation')();
require('./startup/run')(app);
require('./startup/prod')(app);
