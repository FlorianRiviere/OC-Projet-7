import axios from "axios";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../../AppContext";

function PostUserCard({ post }) {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);
  const [sendFollow, setSendFollow] = useState(false);
  const [follow, setFollow] = useState("");
  const [userToFollow, setUserToFollow] = useState("");

  if (sendFollow === true) {
    const handleLikes = async () => {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/follow`,
        withCredentials: true,
        data: {
          userId: uid,
          userToFollow,
          follow,
        },
      })
        .then(() => {
          // dispatch(updateUserInformations);
          setFollow("");
          setUserToFollow("");
          setSendFollow(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    };
    handleLikes();
  }

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

                {user._id !== uid && (
                  <div className="follow-btn-bloc">
                    {!userData.following.includes(user._id) && (
                      <button
                        onClick={() => {
                          setFollow(1);
                          setUserToFollow(user._id);
                          setSendFollow(true);
                        }}
                      >
                        Suivre
                      </button>
                    )}

                    {userData.following.includes(user._id) && (
                      <button
                        className="followed-btn"
                        onClick={() => {
                          setFollow(0);
                          setUserToFollow(user._id);
                          setSendFollow(true);
                        }}
                      >
                        Suivi
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
        )}
      </>
    );
  }
}

export default PostUserCard;
