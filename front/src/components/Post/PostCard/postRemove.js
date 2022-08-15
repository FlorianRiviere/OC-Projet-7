import axios from "axios";
import React from "react";

function PostRemove({
  post,
  setUpdatePost,
  postId,
  setPostId,
  deletePost,
  setDeletePost,
}) {
  const handleDeletePost = (e) => {
    e.preventDefault();

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
      withCredentials: true,
    })
      .then(() => {
        alert("Publication supprimée !");
        setUpdatePost(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {(postId !== post._id || deletePost === false) && (
        <button
          onClick={() => {
            setDeletePost(true);
            setUpdatePost(false);
            setPostId(post._id);
          }}
        >
          Supprimer la publication
        </button>
      )}
      {deletePost === true && post._id === postId && (
        <div className="delete-post-interaction">
          <p>Voulez-vous vraiment supprimer cette publication ?</p>
          <button className="delete-post-btn" onClick={handleDeletePost}>
            Confirmer
          </button>
          <button
            className="delete-post-btn"
            onClick={() => {
              setDeletePost(false);
              setPostId("");
            }}
          >
            Annuler
          </button>
        </div>
      )}
    </>
  );
}

export default PostRemove;
