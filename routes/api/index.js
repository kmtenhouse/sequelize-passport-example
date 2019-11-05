"use strict";

const router = require("express").Router();
const userRoutes = require("./user");
const isApiAuthenticated = require("../../middleware/isApiAuthenticated");

//MAIN ROUTES
//healthcheck route

router.use("/user", userRoutes);

router.get("/user_data", isApiAuthenticated, function (req, res) {
    res.json(req.user);
});

module.exports = router;