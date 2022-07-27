const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { signUpError } = require("../utils/errors-utils");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const User = require("../models/user-model");

/***************************** Authentification *****************************/

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
        .catch((err) => {
          const error = signUpError(err);
          res.status(400).json({ error });
        });
    })

    .catch((error) => res.status(500).json({ error }));
};

// Connexion de l'utilisateur

const maxAge = 7 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

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
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          const token = createToken(user._id);
          res.cookie("jwt", token, { httpOnly: true }, maxAge);
          res.status(200).json({ user: user._id });
        })
        .catch((error) => res.status(501).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "Utilisateur déconnecté !" });
};

/************************************* Users *************************************/

//  Récupérer les utilisateurs

exports.getAllUsers = (req, res, next) => {
  User.find()
    .select("-password")
    .then((users) => {
      const numberOfUsers = users.length;
      for (let i = 0; i < numberOfUsers; i++) {
        const filename = users[i].picture.split("/images/")[1];
        if (fs.existsSync(`images/${filename}`)) {
        } else {
          users[i].picture = `${req.protocol}://${req.get(
            "host"
          )}/public/default-image.jpg`;
        }
      }
      res.status(200).json(users);
    })
    .catch((error) => res.status(401).json(error));
};

// Récupérer un utilisateur

exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      const filename = user.picture.split("/images/")[1];
      if (fs.existsSync(`images/${filename}`)) {
      } else {
        user.picture = `${req.protocol}://${req.get(
          "host"
        )}/public/default-image.jpg`;
      }
      res.status(200).json(user);
    })
    .catch((error) => res.status(401).json(error));
};

// Mise à jour du compte utilisateur

exports.updateUser = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.id) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        if (!req.file) {
          User.updateOne(
            { _id: req.params.id },
            { ...req.body.user, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({ message: "Utilisateur modifié !" })
            )
            .catch((error) => res.status(400).json(error));
        } else {
          if (req.file.size > 9200000) {
            return res.status(400).json({ message: "Image trop grande" });
          }
          if (
            req.file.mimetype !== "image/jpg" &&
            req.file.mimetype !== "image/jpeg" &&
            req.file.mimetype !== "image/png"
          ) {
            return res.status(400).json({ message: "Mauvais format d'image" });
          }
          let mimeType;
          if (req.file.mimetype == "image/jpg") {
            mimeType = ".jpg";
          }
          if (req.file.mimetype == "image/jpeg") {
            mimeType = ".jpg";
          }
          if (req.file.mimetype == "image/png") {
            mimeType = ".png";
          }

          const fileName = "user" + user._id + mimeType;
          console.log(fileName);

          let writeStream = fs.createWriteStream(
            `${__dirname}/../images/users/${fileName}`
          );
          writeStream.write(req.file.buffer);
          writeStream.on("finish", () => {
            console.log("Fichier mis à jour !");
          });

          writeStream.end();
          User.updateOne(
            { _id: req.params.id },
            {
              ...req.body.user,
              picture: `${req.protocol}://${req.get(
                "host"
              )}/images/users/${fileName}`,
              _id: req.params.id,
            }
          )
            .then(() =>
              res.status(200).json({ message: "Utilisateur modifié !" })
            )
            .catch((error) => res.status(400).json(error));
        }
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

// Gestion des follow

exports.follow = (req, res, next) => {
  const follow = req.body.follow;

  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user._id != req.auth.userId) {
        return res.status(401).json({ message: "non autorisé !" });
      }
      switch (follow) {
        case 1:
          if (!user.following.includes(req.body.idToFollow)) {
            User.updateOne(
              { _id: req.params.id },
              { $push: { following: req.body.idToFollow } }
            ),
              ({ _id: req.body.idToFollow },
              { $push: { followers: req.auth.userId } })
                .then(() => {
                  res.status(200).json({ message: "Sauce liked!" });
                })
                .catch((error) => res.status(400).json({ error }));
          }
          break;
        case 0:
          if (user.following.includes(req.body.idToUnfollow)) {
            User.updateOne(
              { _id: req.params.id },
              { $pull: { following: req.body.idToUnfollow } }
            ),
              ({ _id: req.body.idToUnfollow },
              { $pull: { followers: req.auth.userId } })
                .then(() => {
                  res.status(200).json({ message: "Sauce liked!" });
                })
                .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => res.status(500).json(error));
};
