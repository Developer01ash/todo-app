const express = require("express");
const router = express.Router();
const passport = require("passport");
const authenticated = require("../middlewares/authenticated");

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authenticated, authController.logout);
router.get("/profile", authenticated, authController.profile);

module.exports = router;
