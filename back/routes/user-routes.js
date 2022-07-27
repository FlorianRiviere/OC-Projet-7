const express = require("express");
const router = express.Router();
const password = require("../middleware/password-validator");
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

const userCtrl = require("../controllers/user-control");

// Authentification

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

// Comptes utilisateurs

router.get("/", auth.checkUser, userCtrl.getAllUsers);
router.get("/:id", auth.checkUser, userCtrl.getUser);
router.put("/:id", auth.checkUser, upload.single("file"), userCtrl.updateUser);
router.delete("/:id", auth.checkUser, userCtrl.deleteUser);

// Follow

router.post("/:id/follow", auth.checkUser, userCtrl.follow);

module.exports = router;
