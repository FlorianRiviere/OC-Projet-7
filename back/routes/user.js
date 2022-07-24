const express = require("express");
const router = express.Router();
const password = require("../middleware/password-validator");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

// Authentification

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

// Comptes utilisateurs

router.get("/", userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getUser);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

// Follow

router.post("/:id/follow", auth, userCtrl.follow);

module.exports = router;
