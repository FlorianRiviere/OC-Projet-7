import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import HouseUser from "../assets/icons/house-user-solid.svg";
import House from "../assets/icons/house-solid.svg";
import Group from "../assets/icons/user-group-solid.svg";

function Navbar() {
  return (
    <>
      <nav>
        <div className="navbar">
          <NavLink className="navlink" to="/profil">
            <img
              src={HouseUser}
              alt="Icone d'une maison avec une personne dedans"
              title="Profil"
            />
          </NavLink>
          <NavLink className="navlink" to="/">
            <img src={House} alt="Icone d'une maison" title="Page d'accueil" />
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

export default Navbar;
