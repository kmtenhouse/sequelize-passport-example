"use strict";

const router = require("express").Router();
const path = require("path");

//Require auth middleware for protected HTML routes
const isAuthenticated = require("../middleware/isAuthenticated");

//MAIN HTML ROUTES
router.get("/", function (req, res) {
    // If the user is already logged in -> send them to the members page
    if (req.user) {
        return res.redirect("/members");
    }
    // Otherwise, send them to the login page
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/login", function (req, res) {
    // If the user is already logged in -> send them to the members page
    if (req.user) {
        return res.redirect("/members");
    }

    // Otherwise, send them to the login page
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", function (req, res) {
    // If the user is already logged in -> send them to the members page
    if (req.user) {
        return res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be automatically redirected to the login page
router.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
});

// Route for logging user out and redirecting them to the main page
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;