const Comment = require("../models/comment-model");

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    postId: req.body.postId,
    author: req.body.author,
    content: req.body.content,
  });

  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire ajouté !" }))
    .catch((error) => res.status(400).json(error));
};

exports.getAllComments = (req, res, next) => {
  Comment.find()
    .then((comments) => res.status(201).json(comments))
    .catch((error) => res.status(400).json(error));
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({ _id: req.params.id })
    .then((comment) => res.status(201).json(comment))
    .catch((error) => res.status(400).json(error));
};

exports.modifyComment = (req, res, next) => {
  Comment.updateOne({ _id: req.params.id }, { content: req.body.content })
    .then(() => res.status(201).json({ message: "Commentaire modifié !" }))
    .catch((error) => res.status(400).json(error));
};

exports.deleteComment = (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id })
    .then(() => res.status(201).json({ message: "Commentaire supprimé !" }))
    .catch((error) => res.status(400).json(error));
};
