const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "User account created" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found!" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Wrong password!" });
          }
          res.status(200).json({
            userId: user_id,
            token: jwt.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              },
              res.status(201).json({ message: "User connected" })
            ),
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(401).json(error));
};

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(401).json(error));
};

exports.updateUser = (req, res, next) => {
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "User modified" }))
    .catch((error) => res.status(400).json(error));
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "User deleted" }))
    .catch((error) => res.status(400).json(error));
};
