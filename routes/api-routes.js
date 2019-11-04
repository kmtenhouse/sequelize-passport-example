// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
var isApiAuthenticated = require("../middleware/isApiAuthenticated");

module.exports = function (app) {
    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/auth/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/auth/signup", function (req, res) {
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


    // Route for getting some data about our user to be used client side
    app.get("/api/users/:id", isApiAuthenticated, function (req, res) {
        if(req.user.id !== parseInt(req.params.id)) {
            return res.sendStatus(403);
        }
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        res.json({
            email: req.user.email,
            id: req.user.id
        });
    });

    // Route for logging user out via ajax/api
    app.get("/auth/logout", function (req, res) {
        req.logout();
        res.sendStatus(200);
    });
};