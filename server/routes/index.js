const express = require("express");
const router = express();
const authRoute = require("./auth.route");
const todoRoute = require("./todo.route");
router.use("/auth", authRoute);
router.use("/todo", todoRoute);

module.exports = router;
