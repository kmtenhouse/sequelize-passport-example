"use strict";

const router = require("express").Router();
const userRoutes = require("./user");

//Mount any routes in the 'user' directory with the prefix /user
router.use("/user", userRoutes);

module.exports = router;