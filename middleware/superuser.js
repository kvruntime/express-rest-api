module.exports = function(req, res, next){
  if(!req.user.isSuperUser) return res.status(403).send("Access denied")
  
  next()
}