"use strict";

const isApiAuthenticated = require("../../../middleware/isApiAuthenticated");
const router = require("express").Router();

//MAIN ROUTES
// Route for getting some data about our user to be used client side
router.get("/:id", isApiAuthenticated, function (req, res) {
    // We don't want to let people get data about users other than themselves!
    if (req.user.id !== parseInt(req.params.id)) {
        return res.sendStatus(403);
    }
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
        email: req.user.email,
        id: req.user.id
    });
});

module.exports = router;