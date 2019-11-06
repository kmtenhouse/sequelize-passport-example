"use strict";

//require packages
const router = require("express").Router();
const path = require("path");

//Require our api and auth routes
const apiRoutes = require("./api");
const authRoutes = require("./auth");

//Require the html routes
const htmlRoutes = require("./html-routes");

//First, mount api routes with a prefix of /api
router.use("/api", apiRoutes);

//Now, mount the auth routes with a prefix of /auth
router.use("/auth", authRoutes);

//Lastly, mount the html routes without any prefix...they will all be at the root of the project!
router.use(htmlRoutes);

//Finally, add a 404 route to catch anything else
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/404.html"));
});

module.exports = router;