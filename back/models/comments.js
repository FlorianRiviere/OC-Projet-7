const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
