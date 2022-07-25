const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    department: { type: String, required: true },
    manager: { type: Boolean },
    picture: { type: String, default: "../public/default-image.png" },
    isAdmin: { type: Boolean, default: false },
    biography: { type: String, max: 1000 },
    followers: { type: [String] },
    following: { type: [String] },
    postliked: { type: [String] },
    comments: { type: [String] },
    commentsliked: { type: [String] },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
