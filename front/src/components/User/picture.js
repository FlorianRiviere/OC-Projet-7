import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import { updateUserPicture } from "../../feature/userSlice";

function Picture({ paramsId, user }) {
  const uid = useContext(UidContext);
  const dispatch = useDispatch;
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [picture, setPicture] = useState(null);

  const handleImage = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", picture);

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,

      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        // dispatch(updateUserPicture(data));
        alert("Image modifiée");
        setIsUpdatingImage(false);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="image">
      <h2>Image de profil</h2>
      <div className="img-bloc">
        <img src={user.picture} alt="de profil"></img>
      </div>
      <div className="update-image">
        {user._id === uid && isUpdatingImage === false && (
          <div className="image-btn-bloc">
            <button
              className="image-btn"
              onClick={() => setIsUpdatingImage(true)}
            >
              Modifier image
            </button>
          </div>
        )}
        {user._id === uid && isUpdatingImage && (
          <>
            <div className="image-btn-bloc">
              <input
                type="submit"
                className="image-btn"
                value="Valider"
                onClick={handleImage}
              />
              <button
                className="image-btn"
                onClick={() => setIsUpdatingImage(false)}
              >
                Annuler
              </button>
            </div>
            <form>
              <label htmlFor="file"></label>
              <input
                type="file"
                id="file"
                className="choose-image"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setPicture(e.target.files[0])}
              />
            </form>
          </>
        )}
      </div>
    </section>
  );
}

export default Picture;
