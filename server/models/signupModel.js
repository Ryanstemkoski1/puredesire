const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
	counter: {
		type: Number,
		default: 0,
		required: true
	},
	signupDate: {
		type: Date,
		default: Date.now,
		required: true
	},
	users: [{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	}],
});

const Signup = mongoose.model("signup", signupSchema);

module.exports = Signup;