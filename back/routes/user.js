const express = require("express");
const router = express.Router();
const password = require("password-validator");

const userCtrl = require("../controllers/user");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
