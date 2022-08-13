import axios from "axios";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";

function FollowButton({ users }) {
  const uid = useContext(UidContext);

  const userData = useSelector((state) => state.user.user);

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
      <div className="follow-btn-bloc">
        {!userData.following.includes(users._id) && (
          <button
            onClick={() => {
              setFollow(1);
              setUserToFollow(users._id);
              setSendFollow(true);
            }}
          >
            S'abonner
          </button>
        )}

        {userData.following.includes(users._id) && (
          <button
            className="followed-btn"
            onClick={() => {
              setFollow(0);
              setUserToFollow(users._id);
              setSendFollow(true);
            }}
          >
            Abonné
          </button>
        )}
      </div>
    </>
  );
}

export default FollowButton;
