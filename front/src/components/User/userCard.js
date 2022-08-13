import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function UserCard() {
  let paramsId = useParams();
  const usersData = useSelector((state) => state.users.users);

  return (
    <>
      {usersData.map(
        (user) =>
          user._id === paramsId.id && (
            <div className="author-card" key={user._id}>
              <div className="author-image">
                <img
                  src={user.picture}
                  alt="Pastille de l'auteur de la publication"
                ></img>
              </div>
              <div className="author-informations">
                <div className="name">
                  {user.firstName} {user.lastName}
                </div>
                <div className="department">Service {user.department}</div>
              </div>
            </div>
          )
      )}
    </>
  );
}

export default UserCard;
