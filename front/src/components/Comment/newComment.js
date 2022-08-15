import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function NewComment({ post }) {
  const userData = useSelector((state) => state.user.user);

  const [content, setContent] = useState("");
  const author = userData._id;
  const postId = post._id;

  const handleComment = (e) => {
    e.preventDefault();
    if (content === "") {
      alert("Commentaire vide");
    }
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comments`,
      withCredentials: true,
      data: { author, content, postId },
    })
      .then((res) => {
        alert("Commentaire créé");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="comment-card">
        <div className="comment-author">
          <div className="author-card" key={userData._id}>
            <div className="author-image">
              <img
                src={userData.picture}
                alt="Pastille de l'auteur de la publication"
              ></img>
            </div>
            <div className="author-informations">
              <div className="name">
                {userData.firstName} {userData.lastName}
              </div>
              <div className="department">Service {userData.department}</div>
            </div>
          </div>
        </div>
        <div className="comment-content">
          <label htmlFor="commentContent"></label>
          <textarea
            name="commentContent"
            id="commentContent"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="comment-btn-bloc">
          <button onClick={handleComment}>Valider</button>
        </div>
      </div>
    </>
  );
}

export default NewComment;
