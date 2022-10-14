let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

// User Model
const User = require("../models/userModel");

// CREATE User
router.post("/create-user", (req, res, next) => {
    User.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
});

// READ Users
router.get("/", (req, res) => {
    User.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// UPDATE user
router
    .route("/update-user/:id")
    // Get Single User
    .get((req, res) => {
        User.findById(
            req.params.id, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            });
    })

    // Update User Data
    .put((req, res, next) => {
        User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            (error, data) => {
                if (error) {
                    return next(error);
                    console.log(error);
                } else {
                    res.json(data);
                    console.log("User updated successfully !");
                }
            }
        );
    });

// Delete User
router.delete("/delete-user/:id",
    (req, res, next) => {
        User.findByIdAndRemove(
            req.params.id, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.status(200).json({
                        msg: data,
                    });
                }
            });
    });

router
    .route("/get-user-information/:email")
    // Get Single User
    .get((req, res) => {
        // res.json(req.params.email);
        User.findOne(
            {'email':req.params.email}, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            });
    });

module.exports = router;
