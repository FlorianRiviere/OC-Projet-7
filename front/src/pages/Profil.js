import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import UserProfil from "../components/User/userProfil";

function Profil() {
  const uid = useContext(UidContext);

  return (
    <>
      <Header />
      {uid ? (
        <>
          <div className="main-page">
            <Navbar />
            <UserProfil />
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Profil;
