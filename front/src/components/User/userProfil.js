import React, { useContext, useState } from "react";
import { UidContext } from "../AppContext";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Picture from "./picture";
import Biography from "./biography";
import Follow from "./follow";
import UserPosts from "./userPosts";
import PersonalInfos from "./personal-infos";
import UpdateInfos from "./update-infos";
import UpdatePassword from "./update-password";
import axios from "axios";

const UserProfil = () => {
  const uid = useContext(UidContext);
  let paramsId = useParams();

  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);

  const [isUpdatingInformations, setIsUpdatingInformations] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

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

  // Modifications bio

  if (userData !== null && usersData !== null) {
    return (
      <>
        {usersData.map(
          (user) =>
            user._id === paramsId.id && (
              <main key={user._id}>
                {isUpdatingInformations === false &&
                  isUpdatingPassword === false && (
                    <>
                      <h1 className="main-title">
                        Profil de {user.firstName + " " + user.lastName}
                      </h1>
                      <div className="profil">
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
                        <Picture user={user} />

                        <PersonalInfos
                          setIsUpdatingPassword={setIsUpdatingPassword}
                          setIsUpdatingInformations={setIsUpdatingInformations}
                          user={user}
                        />

                        <Biography user={user} />
                        <Follow />
                        <UserPosts />
                      </div>
                    </>
                  )}

                {user._id === uid && isUpdatingInformations && (
                  <>
                    <UpdateInfos
                      setIsUpdatingInformations={setIsUpdatingInformations}
                    />
                  </>
                )}

                {user._id === uid && isUpdatingPassword && (
                  <>
                    <UpdatePassword
                      setIsUpdatingPassword={setIsUpdatingPassword}
                    />
                  </>
                )}
              </main>
            )
        )}
      </>
    );
  }
};

export default UserProfil;
