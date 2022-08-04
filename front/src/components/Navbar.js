import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../feature/userSlice";
import { UidContext } from "../components/AppContext";
import Logout from "./Log/Logout";
import HouseUser from "../assets/icons/house-user-solid.svg";
import House from "../assets/icons/house-solid.svg";
import Group from "../assets/icons/user-group-solid.svg";

function Navbar() {
  const uid = useContext(UidContext);

  const [loadUser, setLoadUser] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    if (loadUser) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getUserData(res.data));
          setLoadUser(false);
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, uid, loadUser]);

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
