module.exports = function(req, res, next){
  console.log("super user")
  console.log(req.user)
  if(!req.user.isSuperUser) return res.status(403).send("Access denied")
  
  next()
}