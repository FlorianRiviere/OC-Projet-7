import React from "react";
import { NavLink } from "react-router-dom";
import HouseUser from "../assets/icons/house-user-solid.svg";
import House from "../assets/icons/house-solid.svg";
import Group from "../assets/icons/user-group-solid.svg";
import Out from "../assets/icons/arrow-right-from-bracket-solid.svg";

function Navbar() {
  return (
    <>
      <nav>
        <NavLink exact to="/profil">
          <img
            src={HouseUser}
            alt="Icone d'une maison avec une personne dedans"
          />
        </NavLink>
        <NavLink exact to="/">
          <img src={House} alt="Icone d'une maison" />
        </NavLink>
        <NavLink exact to="/group">
          <img src={Group} alt="Icone d'un groupe de personnes " />
        </NavLink>
        <NavLink exact to="/group">
          <img src={Out} alt="Icone d'une flèche montrant une sortie " />
        </NavLink>
      </nav>
    </>
  );
}

export default Navbar;
