import React from "react";

function Follow() {
  return (
    <>
      <section className="following">
        <h2>Personnes suivis</h2>
        <div className="following-bloc"></div>
      </section>

      <section className="followers">
        <h2>Personnes qui vous suivent</h2>
        <div className="followers-bloc"></div>
      </section>
    </>
  );
}

export default Follow;
