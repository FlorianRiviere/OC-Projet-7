import React, { useState } from "react";
import { useSelector } from "react-redux";

import Picture from "./picture";
import Biography from "./biography";
import Follow from "./follow";
import UserPosts from "./userPosts";
import PersonalInfos from "./personal-infos";
import UpdateInfos from "./update-infos";
import UpdatePassword from "./update-password";

const UserProfil = () => {
  const userData = useSelector((state) => state.user.user);
  const [isUpdatingInformations, setIsUpdatingInformations] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Modifications bio

  if (userData !== null) {
    return (
      <>
        <main>
          {isUpdatingInformations === false && isUpdatingPassword === false && (
            <>
              <h1 className="main-title">Profil de {userData.firstName}</h1>
              <div className="profil">
                <Picture />
                <PersonalInfos
                  setIsUpdatingPassword={setIsUpdatingPassword}
                  setIsUpdatingInformations={setIsUpdatingInformations}
                />

                <Biography />
                <Follow />
                <UserPosts />
              </div>
            </>
          )}

          {isUpdatingInformations && (
            <>
              <UpdateInfos
                setIsUpdatingInformations={setIsUpdatingInformations}
              />
            </>
          )}

          {isUpdatingPassword && (
            <>
              <UpdatePassword setIsUpdatingPassword={setIsUpdatingPassword} />
            </>
          )}
        </main>
      </>
    );
  }
};

export default UserProfil;
