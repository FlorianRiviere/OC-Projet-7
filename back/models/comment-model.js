const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    postId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
