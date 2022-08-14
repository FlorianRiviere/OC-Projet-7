const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const commentCtrl = require("../controllers/comments-control");

router.post("/", auth.checkUser, commentCtrl.createComment);
router.get("/", auth.checkUser, commentCtrl.getAllComments);
router.get("/:id", auth.checkUser, commentCtrl.getOneComment);
router.put("/:id", auth.checkUser, commentCtrl.modifyComment);
router.delete("/:id", auth.checkUser, commentCtrl.deleteComment);

module.exports = router;
