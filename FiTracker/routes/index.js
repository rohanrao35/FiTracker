var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.visitcount) {  
      req.session.visitcount = 1;
  }
  else {
    req.session.visitcount++;
  }
  res.render('index', { title: 'FiTracker' });
});

module.exports = router;
