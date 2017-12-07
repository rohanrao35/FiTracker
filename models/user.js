const mongoose = require("mongoose");
//mongoose.Promise = global.Promise;


var UserSchema = new mongoose.Schema({

	firstName: String,
	lastName: String,
	username: String,
	gender: Number,
	age: Number,
	password: String,
	loggedIn: Number

	// workout:
	// {
	// 	milesRun: Number,
	// 	heartRate: Number,
	// 	weightAtStart: Number,
	// 	duration: Number,
	// 	caloriesBurned: Number
	// },
  //
	// allWorkouts: [workout],
	// weekWorkouts: [workout],
	// monthWorkouts: [workout],
	// yearWorkouts: [workout]


});


const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;


//Get users
module.exports.getUsers = (callback) => {
	User.find(callback);
}


//Create user
module.exports.addUser = (user, callback) => {
	User.create(user, callback);
}

//Update user

module.exports.updateUser = (un, user, options, callback) => {
	var query = {username: un};
	var update = {

		password: user.password
	}
	User.findOneAndUpdate(query, update, options, callback);
}

//Delete user

module.exports.removeUser = (un, callback) => {
	var query = {username: un};
	User.remove(query, callback);
}

module.exports.login = (un, user, options, callback) => {
	var query = {username: un};
	var update = {
		loggedIn: 1
	}
	User.findOneAndUpdate(query, update, options, callback);
}


// module.exports.updateGenre = (id, genre, options, callback) => {
// 	var query = {_id: id};
// 	var update = {
// 		name: genre.name
// 	}
// 	Genre.findOneAndUpdate(query, update, options, callback);
// }
