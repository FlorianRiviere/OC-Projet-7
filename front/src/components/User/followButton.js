import axios from "axios";
import React, { useContext, useState } from "react";
import { UidContext } from "../AppContext";

function FollowButton({ user, users }) {
  const uid = useContext(UidContext);

  const [sendFollow, setSendFollow] = useState(false);
  const [follow, setFollow] = useState("");
  const [userToFollow, setUserToFollow] = useState("");

  if (sendFollow === true) {
    const handleFollow = async () => {
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
    handleFollow();
  }

  return (
    <>
      {user._id === uid && (
        <div className="follow-btn-bloc">
          {!user.following.includes(users._id) && (
            <button
              onClick={() => {
                setFollow(1);
                setUserToFollow(users._id);
                setSendFollow(true);
              }}
            >
              Suivre
            </button>
          )}

          {user.following.includes(users._id) && (
            <button
              className="followed-btn"
              onClick={() => {
                setFollow(0);
                setUserToFollow(users._id);
                setSendFollow(true);
              }}
            >
              Suivi
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default FollowButton;
