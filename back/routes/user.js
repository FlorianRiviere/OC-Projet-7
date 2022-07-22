const express = require("express");
const router = express.Router();
const password = require("../middleware/password-validator");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getUser);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

router.patch("/follow/:id", auth, userCtrl.follow);

module.exports = router;
