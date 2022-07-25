const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post-control");

// Posts

router.post("/", multer, postCtrl.createPost);
router.get("/", postCtrl.getAllPosts);
router.get("/:id", postCtrl.getOnePost);
router.put("/:id", multer, postCtrl.modifyPost);
router.delete("/:id", multer, postCtrl.deletePost);

router.post("/:id/like", postCtrl.likePost);

module.exports = router;
