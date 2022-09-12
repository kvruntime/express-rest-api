const express = require('express');

module.exports = function (app) {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true })); //key=value1&key=value2
	app.use(express.static('public'));
	app.set('view engine', 'pug');
	app.set('views', './views');
};
