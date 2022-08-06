import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Header from "../components/Header";
import Log from "../components/Log/Log";
import Navbar from "../components/Navbar";
import Thread from "../components/Post/Thread";

function Home() {
  const uid = useContext(UidContext);

  return (
    <>
      <Header />
      {uid ? (
        <>
          <div className="main-page">
            <Navbar />
            <Thread />
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

export default Home;
