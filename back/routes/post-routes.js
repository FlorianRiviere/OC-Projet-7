const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer();

const postCtrl = require("../controllers/post-control");

// Posts

router.post("/", upload.single("file"), postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", upload.single("file"), postCtrl.modifyPost);
router.delete("/:id", postCtrl.deletePost);

router.post("/:id/like", postCtrl.likePost);

module.exports = router;
