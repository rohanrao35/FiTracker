var express = require('express');
var User = require('../models/user');
var Workout = require('../models/workout');

var router = express.Router();


router.route('/users')

.post(function(req, res){
	var User1 = new user();
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.username = req.body.username;
	user.gender = req.body.gender;
	user.age = req.body.age;
	user.password = req.body.password;
});

module.exports = router;
