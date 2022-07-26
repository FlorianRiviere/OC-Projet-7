const Post = require("../models/post-model");
const Comment = require("../models/comment-model");

exports.createComment = (req, res, next) => {
  Post.findOne({ _id: req.body.post._id })
    .then((post) => {
      postData = {
        id: post._id,
      };
    })
    .catch((error) =>
      res.status(400).json({ message: "Post introuvable", error })
    )
    .then(() => {
      const comment = new Comment({
        postId: postData.id,
        author: req.auth.userId,
        content: req.body.content,
      });

      comment
        .save()
        .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
        .catch((error) => res.status(400).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

exports.getAllComments = (req, res, next) => {
  Comment.find({ postId: req.body.postId })
    .then((comments) => res.status(201).json(comments))
    .catch((error) => res.status(400).json(error));
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => res.status(201).json(comment))
    .catch((error) => res.status(400).json(error));
};

exports.modifyComment = (req, res, next) => {
  if ((Post.author = req.auth.userId || req.auth.isAdmin == true)) {
    Comment.updateOne({ _id: req.params.id }, { content: req.body.content })
      .then(() => res.status(201).json({ message: "Commentaire modifié !" }))
      .catch((error) => res.status(400).json(error));
  } else {
    res.status(400).json({ Message: "Non autorisé !" });
  }
};

exports.deleteComment = (req, res, next) => {
  if ((Post.author = req.auth.userId || req.auth.isAdmin == true)) {
    Comment.deleteOne({ _id: req.params.id })
      .then(() => res.status(201).json({ message: "Commentaire supprimé !" }))
      .catch((error) => res.status(400).json(error));
  } else {
    res.status(400).json({ Message: "Non autorisé !" });
  }
};

// Gestion des likes

exports.likeComment = (req, res, next) => {
  const like = req.body.like;

  Comment.findOne({ _id: req.params.id })
    .then((comment) => {
      switch (like) {
        case 1:
          if (comment.usersDisliked.includes(req.auth.userId)) {
            Comment.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.auth.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike enlevé" }))
              .catch((error) => res.status(400).json(error));
          }
          if (!comment.usersLiked.includes(req.auth.userId)) {
            Comment.updateOne(
              { _id: req.params.id },
              { $push: { usersLiked: req.auth.userId }, $inc: { likes: +1 } }
            )
              .then(() => res.status(200).json({ message: "Like ajouté" }))
              .catch((error) => res.status(400).json(error));
          }

          break;
        case -1:
          if (comment.usersLiked.includes(req.auth.userId)) {
            Comment.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.auth.userId },
                $inc: { likes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "Like enlevé" }))
              .catch((error) => res.status(400).json(error));
          }
          if (!comment.usersDisliked.includes(req.auth.userId)) {
            Comment.updateOne(
              { _id: req.params.id },
              {
                $push: { usersDisliked: req.auth.userId },
                $inc: { dislikes: +1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike ajouté" }))
              .catch((error) => res.status(400).json(error));
          }
          break;
        case 0:
          if (comment.usersDisliked.includes(req.auth.userId)) {
            Comment.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.auth.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "Dislike enlevé" }))
              .catch((error) => res.status(400).json(error));
          } else if (comment.usersLiked.includes(req.auth.userId)) {
            Comment.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.auth.userId },
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
