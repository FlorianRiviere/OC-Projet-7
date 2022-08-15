import axios from "axios";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";

function Biography({ user }) {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);
  const [biography, setBiography] = useState(userData.biography);

  const [isUpdatingBiography, setIsUpdatingBiography] = useState(false);

  const handleBiography = () => {
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,
      data: {
        biography,
      },
    })
      .then(() => {
        alert("Biographie modifiée");
        window.location.reload();
      })
      .catch((err) => console.log(err));
    setIsUpdatingBiography(false);
  };

  return (
    <section className="biography">
      <h2>Biographie</h2>
      {isUpdatingBiography === false && (
        <div className="biography-bloc">
          <div className="biography-text">{user.biography}</div>
          {user._id === uid && (
            <div className="biography-btn-bloc">
              <button
                className="biography-btn"
                onClick={() => setIsUpdatingBiography(true)}
              >
                Modifier biographie
              </button>
            </div>
          )}
        </div>
      )}
      {user._id === uid && isUpdatingBiography && (
        <>
          <div className="biography-bloc">
            <form className="biography-text">
              <label htmlFor="biography"></label>
              <textarea
                name="biography"
                id="biography"
                defaultValue={user.biography}
                onChange={(e) => setBiography(e.target.value)}
              ></textarea>
            </form>
            <div className="biography-form-btn-bloc">
              <input
                className="biography-btn"
                type="submit"
                onClick={() => handleBiography()}
              />
              <button
                className="biography-btn"
                onClick={() => setIsUpdatingBiography(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Biography;
