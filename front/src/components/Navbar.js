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
        <NavLink className="navlink" exact to="/profil">
          <img
            src={HouseUser}
            alt="Icone d'une maison avec une personne dedans"
          />
        </NavLink>
        <NavLink className="navlink" exact to="/">
          <img src={House} alt="Icone d'une maison" />
        </NavLink>
        <NavLink className="navlink" exact to="/group">
          <img src={Group} alt="Icone d'un groupe de personnes " />
        </NavLink>
        <Logout />
      </nav>
    </>
  );
}

export default Navbar;
