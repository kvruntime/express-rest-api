const port = process.env.PORT || 3000;
module.exports = function (app) {
	app.listen(port, () => {
		console.log(`Listening on port...${port}`);
	});
};
