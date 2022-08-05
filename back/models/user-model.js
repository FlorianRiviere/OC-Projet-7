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
    picture: { type: String, default: "" },
    biography: { type: String, default: "", max: 1000 },
    isAdmin: { type: Boolean, default: false },
    followers: { type: [String] },
    following: { type: [String] },
    postliked: { type: [String] },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
