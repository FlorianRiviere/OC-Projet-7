import React from "react";
import { useSelector } from "react-redux";

function PostUserCard({ post }) {
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
                </a>
              </div>
            )
        )}
      </>
    );
  }
}

export default PostUserCard;
