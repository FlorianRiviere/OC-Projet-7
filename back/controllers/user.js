const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const User = require("../models/user");

// Création du compte utilisateur

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
        .then(() =>
          res.status(201).json({ message: "Compte utilisateur créé !" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connexion de l'utilisateur

exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mauvais mot de passe !" });
          }
          res.status(200).json({
            userId: user_id,
            token: jwt.sign(
              { userId: user._id },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              },
              res.status(201).json({ message: "Utilisateur connecté" })
            ),
          });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//  Récupérer les utilisateurs

exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(401).json(error));
};

// Récupérer un utilisateur

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(401).json(error));
};

// Mise à jour du compte utilisateur

exports.updateUser = (req, res, next) => {
  const userObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        picture: `${req.protocol}://${req.get("host")}/images/users/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != rq.auth.id) {
        res.status(401).json({ message: "Non autorisé" });
      } else if (userObject.picture == undefined) {
        User.updateOne(
          { _id: req.params.id },
          { ...userObject, _id: req.params.id }
        )
          .then(() =>
            res.status(200).json({ message: "Utilisateur modifié !" })
          )
          .catch((error) => res.status(400).json(error));
      } else {
        const filename = user.picture.split("/images/users/")[1];
        fs.unlink(`images/users/${filename}`, () => {
          User.updateOne(
            { _id: req.params.id },
            { ...userObject, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({ message: "Utilisateur modifié !" })
            )
            .catch((error) => res.status(400).json(error));
        });
      }
    })
    .catch((error) => res.status(500).json(error));
};

// Suppression du compte utilisateur

exports.deleteUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId) {
        res.status(401).json({ message: "non autorisé !" });
      } else {
        const filename = user.picture.split("/images/users/")[1];
        fs.unlink(`images/users/${filename}`, () => {
          User.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "Compte utilisateur supprimé !" })
            )
            .catch((error) => res.status(400).json(error));
        });
      }
    })
    .catch((error) => res.status(500).json(error));
};
