import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import Out from "../../assets/icons/arrow-right-from-bracket-solid.svg";

function Logout() {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/users/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");
        window.location = "/";
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button className="navlink logout" onClick={logout}>
        <img
          src={Out}
          alt="Icone d'une flèche montrant une sortie "
          title="Se déconnecter"
        />
      </button>
    </>
  );
}

export default Logout;
