"use strict";

const router = require("express").Router();

// Requiring our models and passport as we've configured it
var db = require("../../models/");
const passport = require("../../config/passport");

//MAIN ROUTES
// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function (req, res) {
    db.User.create({
        email: req.body.email,
        password: req.body.password
    })
        .then(function () {
            res.redirect(307, "/auth/login");
        })
        .catch(function (err) {
            res.status(401).json(err);
        });
});

// Route for logging user out via ajax/api
router.get("/logout", function (req, res) {
    req.logout();
    res.sendStatus(200);
});

module.exports = router;