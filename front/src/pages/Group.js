import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import { Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function Group() {
  const uid = useContext(UidContext);

  return (
    <>
      <Header />
      {uid ? (
        <>
          <div className="main-page">
            <Navbar />
            <div>Group !</div>
          </div>
        </>
      ) : (
        <Route path="/" element={<Navigate replace to="/" />} />
      )}
    </>
  );
}

export default Group;
