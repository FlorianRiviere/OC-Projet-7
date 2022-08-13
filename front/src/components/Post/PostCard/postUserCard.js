import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../../AppContext";

function PostUserCard({ post }) {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);

  if (usersData !== null) {
    return (
      <>
        {usersData.map(
          (user) =>
            user._id === post.author && (
              <div className="author-card" key={user._id}>
                <a href={`/profil/${user._id}`}>
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

                  {user._id !== uid && (
                    <div className="follow-btn-bloc">
                      {!userData.following.includes(user._id) && (
                        <button>Suivre</button>
                      )}

                      {userData.following.includes(user._id) && (
                        <button className="followed-btn">Suivi</button>
                      )}
                    </div>
                  )}
                </a>
              </div>
            )
        )}
      </>
    );
  }
}

export default PostUserCard;
