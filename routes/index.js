"use strict";

//require packages
const router = require("express").Router();
const path = require("path");

//Require auth middleware for HTML routes
const isAuthenticated = require("../middleware/isAuthenticated");

//Require our api and auth routes
const apiRoutes = require("./api");
const authRoutes = require("./auth");

//First, mount api routes at /api
router.use("/api", apiRoutes);

//Now, mount the auth routes at /auth
router.use("/auth", authRoutes);

//MAIN HTML ROUTES
router.get("/", function (req, res) {
    // If the user is already logged in -> send them to the members page
    if (req.user) {
        return res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/login", function (req, res) {
    // If the user is already logged in -> send them to the members page
    if (req.user) {
        return res.redirect("/members");
    }
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
// If a user who is not logged in tries to access this route they will be redirected to the login page
router.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
});

// Route for logging user out and redirecting them to the main page
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;