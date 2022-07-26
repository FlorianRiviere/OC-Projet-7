const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const commentCtrl = require("../controllers/comments-control");

router.post("/", commentCtrl.createComment);
router.get("/", commentCtrl.getAllComments);
router.get("/:id", commentCtrl.getOneComment);
router.put("/:id", commentCtrl.modifyComment);
router.delete("/:id", commentCtrl.deleteComment);

router.post("/:id/like", commentCtrl.likeComment);

module.exports = router;
