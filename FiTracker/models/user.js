const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


var UserSchema = new mongoose.Schema({
	
	firstName: String,
	lastName: String,
	username: String,
	gender: Number,
	age: Number,
	password: String,

	workout:
	{
		milesRun: Number,
		heartRate: Number,
		weightAtStart: Number,
		duration: Number,
		caloriesBurned: Number
	},

	allWorkouts: [workout],
	weekWorkouts: [workout],
	monthWorkouts: [workout],
	yearWorkouts: [workout]

	
});


const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
