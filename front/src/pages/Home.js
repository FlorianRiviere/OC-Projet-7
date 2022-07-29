import React from "react";
import Header from "../components/Header";
import Log from "../components/Log";

function Home() {
  return (
    <>
      {" "}
      <Header />
      <main className="home-page">
        <section className="log-container">
          <Log />
        </section>
      </main>
    </>
  );
}

export default Home;
