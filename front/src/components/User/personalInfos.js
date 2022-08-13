import React, { useContext } from "react";
import { UidContext } from "../AppContext";

function PersonalInfos({
  setIsUpdatingPassword,
  setIsUpdatingInformations,
  user,
}) {
  const uid = useContext(UidContext);

  return (
    <section className="informations">
      <h2>Informations personnelles</h2>
      <div className="info-bloc">
        <ul>
          <li className="info-label">Prénom :</li>
          <li className="info">{user.firstName}</li>
          <li className="info-label">Nom :</li>
          <li className="info">{user.lastName}</li>
          <li className="info-label">Email :</li>
          <li className="info">{user.email}</li>
          <li className="info-label">Service :</li>
          <li className="info">{user.department}</li>
        </ul>
      </div>
      {user._id === uid && (
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
      )}
    </section>
  );
}

export default PersonalInfos;
