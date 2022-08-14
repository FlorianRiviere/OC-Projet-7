import axios from "axios";
import React from "react";

function RemoveComment({
  comment,
  commentId,
  setCommentId,
  deleteComment,
  setDeleteComment,
  setUpdateComment,
}) {
  const handleDeleteComment = (e) => {
    e.preventDefault();

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comments/${commentId}`,
      withCredentials: true,
    })
      .then(() => {
        // dispatch(updateUserInformations);
        alert("Commentaire supprimé !");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {(commentId !== comment._id || deleteComment === false) && (
        <button
          onClick={() => {
            setDeleteComment(true);
            setUpdateComment(false);
            setCommentId(comment._id);
          }}
        >
          Supprimer la publication
        </button>
      )}
      {deleteComment === true && comment._id === commentId && (
        <div className="delete-comment-interaction">
          <p>Voulez-vous vraiment supprimer ce commentaire ?</p>
          <button className="delete-comment-btn" onClick={handleDeleteComment}>
            Confirmer
          </button>
          <button
            className="delete-comment-btn"
            onClick={() => {
              setDeleteComment(false);
              setCommentId("");
            }}
          >
            Annuler
          </button>
        </div>
      )}
    </>
  );
}

export default RemoveComment;
