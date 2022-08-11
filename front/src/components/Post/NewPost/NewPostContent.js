import React, { useState } from "react";

function NewPostContent({ setPicture, setContent }) {
  const [uploadImage, setUploadImage] = useState(false);

  return (
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
  );
}

export default NewPostContent;
