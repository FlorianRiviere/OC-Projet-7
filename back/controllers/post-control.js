const Post = require("../models/post-model");
const User = require("../models/user-model");
const Comment = require("../models/comment-model");
const fs = require("fs");

// Création du post

exports.createPost = (req, res, next) => {
  if (req.file) {
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

    const post = new Post({
      author: req.body.author,
      content: req.body.content,
      picture: `${req.protocol}://${req.get("host")}/images/posts/${
        req.file.filename
      }`,
    });
    post
      .save()
      .then(() => res.status(201).json({ message: "Post créé !" }))
      .catch((error) => res.status(400).json(error));
  } else {
    const post = new Post({
      author: req.body.author,
      content: req.body.content,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({ message: "Post créé !" });
      })
      .catch((error) => res.status(400).json(error));
  }
};

// Récupération des posts

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json(error));
};

// Récupération d'un post

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json(error));
};

// Modification d'un post

exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (req.file) {
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
          mimeType = ".jpeg";
        }
        if (req.file.mimetype == "image/png") {
          mimeType = ".png";
        }

        const filename = post.picture.split("images/posts/")[1];
        fs.unlink(`images/posts/${filename}`, () => {
          Post.updateOne(
            { _id: req.params.id },
            {
              ...req.body,
              picture: `${req.protocol}://${req.get("host")}/images/posts/${
                req.file.filename
              }`,
              _id: req.params.id,
            }
          )
            .then(() => res.status(200).json({ message: "Post modifié !" }))
            .catch((error) => res.status(400).json(error));
        });
      } else {
        Post.updateOne(
          { _id: req.params.id },
          { ...req.body, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Post modifié !" }))
          .catch((error) => res.status(400).json(error));
      }
    })
    .catch((error) => res.status(500).json(error));
};

// Suppression d'un post

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      Comment.deleteMany({ postId: req.params.id });
      const filename = post.picture.split("images/posts/")[1];
      fs.unlink(`images/posts/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post supprimé !" }))
          .catch((error) => res.status(400).json(error));
      });
    })
    .catch((error) => res.status(500).json(error));
};

// Gestion des likes

exports.likePost = (req, res, next) => {
  let like = req.body.like;

  Post.findOne({ _id: req.params.id })
    .then((post) => {
      switch (like) {
        case 1:
          if (
            post.usersDisliked.includes(req.body.userId) &&
            !post.usersLiked.includes(req.body.userId)
          ) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $push: { usersLiked: req.body.userId },
                $inc: { dislikes: -1, likes: +1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike enlevé" }))
              .catch((error) => res.status(400).json(error));
          } else if (!post.usersLiked.includes(req.body.userId)) {
            Post.updateOne(
              { _id: req.params.id },
              { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }
            )
              .then(() => res.status(200).json({ message: "Like ajouté" }))
              .catch((error) => res.status(400).json(error));
          }

          break;

        case -1:
          if (
            post.usersLiked.includes(req.body.userId) &&
            !post.usersDisliked.includes(req.body.userId)
          ) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $push: { usersDisliked: req.body.userId },
                $inc: { likes: -1, dislikes: +1 },
              }
            )
              .then(() => res.status(200).json({ message: "Like enlevé" }))
              .catch((error) => res.status(400).json(error));
          } else if (!post.usersDisliked.includes(req.body.userId)) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: +1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike ajouté" }))
              .catch((error) => res.status(400).json(error));
          }
          break;

        case 0:
          if (post.usersDisliked.includes(req.body.userId)) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike enlevé" }))
              .catch((error) => res.status(400).json(error));
          }
          if (post.usersLiked.includes(req.body.userId)) {
            Post.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $inc: { likes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "Like enlevé" }))
              .catch((error) => res.status(400).json(error));
          }
          break;
      }
    })
    .catch((error) => res.status(500).json(error));
};
