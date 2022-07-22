const express = require("express");
const router = express.Router();
const password = require("../middleware/password-validator");

const userCtrl = require("../controllers/user");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);
router.put("/:id", userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
