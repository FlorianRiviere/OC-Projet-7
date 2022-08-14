const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");

const commentCtrl = require("../controllers/comments-control");

router.post("/", auth, commentCtrl.createComment);
router.get("/", auth, commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getOneComment);
router.put("/:id", auth, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
