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

const UserProfil = () => {
  const uid = useContext(UidContext);
  let paramsId = useParams();

  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);

  const [isUpdatingInformations, setIsUpdatingInformations] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Modifications bio

  if (userData !== null) {
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
