import axios from "axios";
import React from "react";

function PostUpdateInteraction({
  post,
  updatePost,
  setUpdatePost,
  postId,
  setPostId,
  picture,
  setPicture,
  content,
  setContent,
  setDeletePost,
}) {
  const handlePost = (e) => {
    e.preventDefault();

    if (picture) {
      const data = new FormData();

      data.append("content", content);
      data.append("image", picture);

      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
        withCredentials: true,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          // dispatch(updateUserInformations);
          alert("Informations modifiées");
          setUpdatePost(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
        withCredentials: true,
        data: { content },
      })
        .then(() => {
          // dispatch(updateUserInformations);
          alert("Informations modifiées");
          setUpdatePost(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {updatePost === false && (
        <button
          onClick={() => {
            setUpdatePost(true);
            setDeletePost(false);
            setPostId(post._id);
            setContent(post.content);
            setPicture(post.picture);
          }}
        >
          Modifier la publication
        </button>
      )}

      {updatePost === true && postId !== post._id && (
        <button
          onClick={() => {
            setPostId(post._id);
            setContent(post.content);
            setPicture(post.picture);
          }}
        >
          Modifier la publication
        </button>
      )}

      {updatePost === true && postId === post._id && (
        <div className="update-post-interaction">
          <input
            className="update-post-btn"
            form="update-post"
            type="submit"
            onClick={handlePost}
            value="Valider"
          />
          <button
            className="update-post-btn"
            onClick={() => {
              setUpdatePost(false);
              setPostId("");
              setContent("");
              setPicture("");
            }}
          >
            Annuler
          </button>
        </div>
      )}
    </>
  );
}

export default PostUpdateInteraction;
