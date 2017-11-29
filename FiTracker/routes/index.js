var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FiTracker' });
});

router.post("/login", (req, res) => {
  res.render("userInfo");
});


module.exports = router;
