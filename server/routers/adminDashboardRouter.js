let express = require("express"),
	router = express.Router();

// User Model
const User = require("../models/userModel");

// Signup Tracking Component
const Signup = require("../components/signupComponent");

async function getDashboardData(){
	const userTotal = await User.countDocuments();
	const signUps = await Signup.getSignups();
	return {
		userTotal: userTotal,
		userSignups: signUps
	};
}

router.get("/", (req, res) => {
	getDashboardData().then(function(dashboardData){
		res.send(dashboardData);
	});
});

module.exports = router;