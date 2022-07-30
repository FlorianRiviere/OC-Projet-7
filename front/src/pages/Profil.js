import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Profil() {
  const uid = useContext(UidContext);

  return (
    <>
      <Header />
      {uid ? (
        <>
          <div className="main-page">
            <Navbar />
            <div>Profil !</div>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Profil;
