const express = require("express");
const router = express.Router();
const password = require("../middleware/password-validator");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth.middleware");

const userCtrl = require("../controllers/user-control");

// Authentification

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

// Comptes utilisateurs

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getUser);
router.put("/:id", multer, userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);

// Follow

router.post("/:id/follow", userCtrl.follow);

module.exports = router;
