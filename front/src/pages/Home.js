import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import Header from "../components/Header";
import Log from "../components/Log";

function Home() {
  const uid = useContext(UidContext);
  return (
    <>
      <Header />
      <main className="home-page">
        {uid ? (
          <div>Bienvenue !</div>
        ) : (
          <section className="log-container">
            <Log />
          </section>
        )}
      </main>
    </>
  );
}

export default Home;
