import React from "react";
import { useSelector } from "react-redux";

function UserCard() {
  const userData = useSelector((state) => state.user.user);

  return (
    <div className="author-card">
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
  );
}

export default UserCard;
