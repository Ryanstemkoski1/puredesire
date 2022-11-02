// Import Models
const Signup = require("../models/signupModel");

module.exports = {
	addSignup: (user_id) => {

		let today = new Date().setHours(0,0,0,0);

		const signup = Signup.findOneAndUpdate({
			signupDate: today
		}, {
			signupDate: today,
			$inc: {counter: +1},
			$push: {
				users: {
					user_id: user_id
				}
			}
		}, {
			new: true,
			upsert: true
		}, (error, data) => {

			console.log(error);

		});

		return Signup;
	},
	getSignups: () => {
		let today = new Date();
		return Signup.find({
			signupDate: {
				$gte: today.setDate(today.getDate() - 30)
			}
		});
	}
};