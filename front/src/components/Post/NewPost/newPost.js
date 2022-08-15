import React, { useContext, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { UidContext } from "../../AppContext";
import NewPostUserCard from "./NewPostUserCard";
import NewPostContent from "./NewPostContent";

function NewPost() {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);
  const [editPost, setEditPost] = useState(false);

  const author = uid;
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (content === "") {
      alert("Publication vide");
    } else if (picture === "") {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
        data: { author, content },
      })
        .then((res) => {
          // dispatch(addPost);
          console.log(res.data);
          alert("Publication créée");
          // setUploadImage(false);
          // window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      const data = new FormData();

      data.append("author", author);
      data.append("content", content);
      data.append("image", picture);

      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          // dispatch(addPost);
          console.log(res.data);
          alert("Publication créée");
          // setUploadImage(false);
          // window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  if (userData !== null) {
    return (
      <>
        {editPost === false && (
          <div className="new-post-card">
            <div className="user-picture">
              <img src={userData.picture} alt="Pastille de l'utilisateur"></img>
            </div>
            <div className="new-post-card-btn-bloc">
              <button
                className="new-post-card-btn"
                onClick={() => setEditPost(true)}
              >
                Ajouter une publication
              </button>
            </div>
          </div>
        )}
        {editPost && (
          <div className="post-card">
            <NewPostUserCard />
            <NewPostContent setPicture={setPicture} setContent={setContent} />

            <div className="submit-post-btn-bloc">
              <input
                form="new-post"
                type="submit"
                className="submit-post-btn"
                value="Poster la publication"
                onClick={handlePost}
              />
              <button
                className="submit-post-btn"
                onClick={() => setEditPost(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default NewPost;
