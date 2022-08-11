import React from "react";
import { useSelector } from "react-redux";

function NewPostUserCard() {
  const userData = useSelector((state) => state.user.user);

  return (
    <div className="user">
      <div className="user-picture">
        <img src={userData.picture} alt="Pastille de l'utilisateur"></img>
      </div>
      <div className="user-informations">
        <div className="name">
          {userData.firstName} {userData.lastName}
        </div>
        <div className="department">Service {userData.department}</div>
      </div>
    </div>
  );
}

export default NewPostUserCard;
