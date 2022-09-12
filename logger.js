const winston=require("winston")
require("winston-mongodb")

module.exports.vidlyLogger =  winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'combined.log' }),
		new winston.transports.MongoDB({db:process.env.VIDLY_DB_URL})
	],
});