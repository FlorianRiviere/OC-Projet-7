import React from "react";
import { useSelector } from "react-redux";

function PersonalInfos({ setIsUpdatingPassword, setIsUpdatingInformations }) {
  const userData = useSelector((state) => state.user.user);

  return (
    <section className="informations">
      <h2>Informations personnelles</h2>
      <div className="info-bloc">
        <ul>
          <li className="info-label">Prénom :</li>
          <li className="info">{userData.firstName}</li>
          <li className="info-label">Nom :</li>
          <li className="info">{userData.lastName}</li>
          <li className="info-label">Email :</li>
          <li className="info">{userData.email}</li>
          <li className="info-label">Service :</li>
          <li className="info">{userData.department}</li>
        </ul>
      </div>
      <div className="update-btn-bloc">
        <button
          className="update-btn"
          onClick={() => setIsUpdatingPassword(true)}
        >
          Modifier mot de passe
        </button>
        <button
          className="update-btn"
          onClick={() => setIsUpdatingInformations(true)}
        >
          Modifier informations
        </button>
      </div>
    </section>
  );
}

export default PersonalInfos;
