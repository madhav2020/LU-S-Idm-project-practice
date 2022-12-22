const express = require("express");
const authRoutes = require("./authentication.routes");
const router = express.Router();

router.use("/auth", authRoutes); // router.use is middleware which will execute first in the component

module.exports = router;
