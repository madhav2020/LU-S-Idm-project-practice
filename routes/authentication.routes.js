const express = require("express");
const { join, login } = require("../controller/authentication.controller");

const router = express.Router();

// SIGNUP ROUTES
router.post("/join", join);

// LOGIN ROUTES
router.post("/login", login);

module.exports = router;
