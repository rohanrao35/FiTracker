var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  res.send('respond with a resource');
});


module.exports = router;
