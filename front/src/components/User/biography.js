import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import { updateUserInformations } from "../../feature/userSlice";

function Biography() {
  const uid = useContext(UidContext);

  const dispatch = useDispatch;
  const userData = useSelector((state) => state.user.user);
  const [biography, setBiography] = useState("");

  const [isUpdatingBiography, setIsUpdatingBiography] = useState(false);

  const handleBiography = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,
      data: {
        biography,
      },
    })
      .then(() => {
        dispatch(updateUserInformations);
        alert("Biographie modifiée");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="biography">
      <h2>Biographie</h2>
      {isUpdatingBiography === false && (
        <div className="biography-bloc">
          <div className="biography-text">{userData.biography}</div>
          <div className="biography-btn-bloc">
            <button
              className="biography-btn"
              onClick={() => setIsUpdatingBiography(true)}
            >
              Modifier biographie
            </button>
          </div>
        </div>
      )}
      {isUpdatingBiography && (
        <>
          <div className="biography-bloc">
            <form className="biography-text">
              <label htmlFor="biography"></label>
              <textarea
                name="biography"
                id="biography"
                onChange={(e) => setBiography(e.target.value)}
              ></textarea>
            </form>
            <div className="biography-form-btn-bloc">
              <input
                className="biography-btn"
                type="submit"
                onClick={handleBiography}
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
      <div className="biography-bloc"></div>
    </section>
  );
}

export default Biography;
