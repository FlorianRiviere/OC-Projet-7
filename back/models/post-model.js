const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true },
    picture: { type: String, default: "" },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
