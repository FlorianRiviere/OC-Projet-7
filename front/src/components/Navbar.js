import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Log/Logout";
import House from "../assets/icons/house-solid.svg";
import Group from "../assets/icons/user-group-solid.svg";

function Navbar() {
  const userData = useSelector((state) => state.user.user);

  if (userData !== null) {
    return (
      <>
        <nav>
          <div className="navbar">
            <NavLink className="navlink" to="/profil">
              <img
                src={userData.picture}
                alt="Icone d'une maison avec une personne dedans"
                title="Profil"
              />
            </NavLink>
            <NavLink className="navlink" to="/">
              <img
                src={House}
                alt="Icone d'une maison"
                title="Page d'accueil"
              />
            </NavLink>
            <NavLink className="navlink" to="/group">
              <img
                src={Group}
                alt="Icone d'un groupe de personnes"
                title="Votre service"
              />
            </NavLink>
            <Logout />
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
