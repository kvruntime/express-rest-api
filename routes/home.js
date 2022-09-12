const express = require('express');

const router = express.Router();
// router.set("views")

router.get('/', (req, res) => {
  // res.send('Hello Guys!!');
  res.render("index", {title:"homepage", message:"Home Page"})
});

module.exports = router;
