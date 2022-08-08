const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const multer = require("../middleware/multer-config-posts");
const postCtrl = require("../controllers/post-control");

// Posts

router.post("/", auth.checkUser, multer, postCtrl.createPost);
router.get("/", auth.checkUser, postCtrl.getAllPosts);
router.get("/:id", auth.checkUser, postCtrl.getOnePost);
router.put("/:id", auth.checkUser, multer, postCtrl.modifyPost);
router.delete("/:id", auth.checkUser, postCtrl.deletePost);

router.post("/:id/like", auth.checkUser, postCtrl.likePost);

module.exports = router;
