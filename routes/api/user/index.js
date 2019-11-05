"use strict";

const isApiAuthenticated = require("../../../middleware/isApiAuthenticated");
const router = require("express").Router();
const db = require("../../../models/");

//MAIN ROUTES
// Route for getting some data about our user to be used client 

// Note: for this site, we don't want to let people get data about users other than themselves!
// As a result, the 'get' is hidden behind our api authentication middleware
// and it will ONLY return data about the particular person who is logged in
router.get("/", isApiAuthenticated, function (req, res) {
    // Note: it's always smart to be cautious about what you are sending back to the front end
    //Ex: sending a password, even a hashed password, isn't a good idea
    res.json({
        email: req.user.email,
        id: req.user.id
    });
});

module.exports = router;