import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log/Log";
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
        <div className="log">
          <section className="log-container">
            <Log />
          </section>
        </div>
      )}
    </>
  );
}

export default Group;
