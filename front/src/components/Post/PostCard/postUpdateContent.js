import React, { useState } from "react";

function PostUpdateContent({ post, setContent, setPicture }) {
  const [uploadImage, setUploadImage] = useState(false);

  return (
    <>
      <form id="update-post">
        <div className="post-content">
          <label htmlFor="content"></label>
          <textarea
            name="content"
            id="content"
            defaultValue={post.content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          {post.picture && (
            <div className="post-image">
              <img
                src={post.picture}
                alt="Illustration de la publication"
              ></img>
              {uploadImage === false && (
                <button
                  className="edit-post-btn"
                  onClick={() => setUploadImage(true)}
                >
                  Modifier l'image
                </button>
              )}
            </div>
          )}

          {!post.picture && (
            <div className="post-image">
              {uploadImage === false && (
                <button
                  className="edit-post-btn"
                  onClick={() => setUploadImage(true)}
                >
                  Ajouter une image
                </button>
              )}
            </div>
          )}

          {uploadImage === true && (
            <>
              <div className="post-image">
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
                    onClick={() => {
                      setUploadImage(false);
                      setPicture(post.picture);
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}

export default PostUpdateContent;
