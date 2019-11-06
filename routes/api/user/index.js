"use strict";

const router = require("express").Router();

//Require all the models from the db
const db = require("../../../models/");

//Require our api middleware 
const isApiAuthenticated = require("../../../middleware/isApiAuthenticated");

// Routes
// Note: for this site, we don't want to let people get data about users other than themselves!
// As a result, the 'get' is hidden behind our api authentication middleware
// and it will ONLY return data about the particular person who is logged in
router.get("/", isApiAuthenticated, function (req, res) {
    // Note: it's always smart to be cautious about what you are sending back to the front end
    //Ex: sending a password, even a hashed password, isn't a good idea
    db.User.findOne({ where: { id: req.user.id } })
        .then(result => res.json(result))
        .catch(err => res.sendStatus(500));
});

module.exports = router;