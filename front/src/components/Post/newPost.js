import React, { useContext, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import { addPost } from "../../feature/postsSlice";

function NewPost() {
  const uid = useContext(UidContext);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [editPost, setEditPost] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);

  const author = uid;
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (content === "") {
      alert("Publication vide");
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
        .then(() => {
          dispatch(addPost);
          alert("Publication créée");
          // setUploadImage(false);
          window.location.reload();
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
            <div className="user">
              <div className="user-picture">
                <img
                  src={userData.picture}
                  alt="Pastille de l'utilisateur"
                ></img>
              </div>
              <div className="user-informations">
                <div className="name">
                  {userData.firstName} {userData.lastName}
                </div>
                <div className="department">Service {userData.department}</div>
              </div>
            </div>
            <div className="post-text">
              <form id="new-post">
                <label htmlFor="content"></label>
                <textarea
                  name="content"
                  id="content"
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
                {uploadImage === false && (
                  <button
                    className="edit-post-btn"
                    onClick={() => setUploadImage(true)}
                  >
                    Ajouter une image
                  </button>
                )}
                {uploadImage === true && (
                  <>
                    <label htmlFor="file"></label>
                    <input
                      type="file"
                      id="file"
                      className="choose-image"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => setPicture(e.target.files[0])}
                    />
                    <div className="edit-post-btn-bloc">
                      <button
                        className="edit-post-btn"
                        onClick={() => setUploadImage(false)}
                      >
                        Annuler
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
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
