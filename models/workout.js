const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;

var WorkoutSchema = new mongoose.Schema({

	username: {
		type: String,
		required: true
	},

	gender: {
		type: Number,
		required: true
	},
	age: {
		type: Number,
		required: true
	},

	date:{
		type: Date,
		default: Date.now
	},
	milesRun: Number,
	heartRate: Number,
	weightAtStart: Number,
	duration: Number,
	caloriesBurned: Number

});


const WorkoutModel = module.exports = mongoose.model('Workout', WorkoutSchema);
module.exports = WorkoutModel;
//Get users
module.exports.getWorkouts = function(callback, limit){
	Workout.find(callback).limit(limit);
}

module.exports.addWorkout = (workout, callback) => {
	Workout.create(workout, callback);
}
