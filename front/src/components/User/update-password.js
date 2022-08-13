import axios from "axios";
import React, { useContext, useState } from "react";
import { UidContext } from "../AppContext";

function UpdatePassword({ setIsUpdatingPassword }) {
  const uid = useContext(UidContext);
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Modifications MDP

  const handlePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Le nouveau mot de passe est différent de la confirmation");
    } else {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/users/${uid}/password`,
        withCredentials: true,
        data: {
          password: newPassword,
        },
      })
        .then(() => {
          alert("Mot de passe modifié");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="update-profil">
      <h1>Modifier mot de passe</h1>
      <form>
        <div className="update-informations">
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            onChange={(e) => setnewPassword(e.target.value)}
          />

          <label>Confirmer mot de passe :</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="update-form-btn-bloc">
          <input
            className="update-form-btn"
            type="submit"
            onClick={handlePassword}
          />
          <button
            className="update-form-btn"
            onClick={() => setIsUpdatingPassword(false)}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;
