
function logger(req, res, next) {
  console.log("Logging...");
  next();
};

function authenticating(req, res, next) {
  console.log("Authenticating...");
  next();
};

module.exports.logger = logger
module.exports.authenticater = authenticating