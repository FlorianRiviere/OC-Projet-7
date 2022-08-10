import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInformations } from "../../feature/userSlice";
import { UidContext } from "../AppContext";
import Picture from "./picture";
import { options } from "../departments";

import Biography from "./biography";
import Follow from "./follow";
import UserPosts from "./userPosts";

const UserProfil = () => {
  const uid = useContext(UidContext);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const [isUpdatingInformations, setIsUpdatingInformations] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Modifications infos

  const handleInformations = (e) => {
    e.preventDefault();

    if (lastName === "") {
      setLastName(userData.lastName);
    }
    if (firstName === "") {
      setFirstName(userData.firstName);
    }
    if (department === "") {
      setDepartment(userData.department);
    }
    if (email === "") {
      setEmail(userData.email);
    }

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,
      data: {
        firstName,
        lastName,
        email,
        department,
      },
    })
      .then(() => {
        dispatch(updateUserInformations);
        alert("Informations modifiées");
        setIsUpdatingInformations(false);
        // window.location.reload();
      })
      .catch((err) => console.log(department, err));
  };

  // Modifications MDP

  const handlePassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Le nouveau mot de passe est différent de la confirmation");
    } else {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/users/${uid}/password`,
        withCredentials: true,
        data: {
          password: newPassword,
        },
      })
        .then(() => {
          dispatch(updateUserInformations);
          alert("Mot de passe modifié");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  // Modifications bio

  if (userData !== null) {
    return (
      <>
        <main>
          {isUpdatingInformations === false && isUpdatingPassword === false && (
            <>
              <h1 className="main-title">Profil de {userData.firstName}</h1>
              <div className="profil">
                <Picture />
                <section className="informations">
                  <h2>Informations personnelles</h2>
                  <div className="info-bloc">
                    <ul>
                      <li className="info-label">Prénom :</li>
                      <li className="info">{userData.firstName}</li>
                      <li className="info-label">Nom :</li>
                      <li className="info">{userData.lastName}</li>
                      <li className="info-label">Email :</li>
                      <li className="info">{userData.email}</li>
                      <li className="info-label">Service :</li>
                      <li className="info">{userData.department}</li>
                    </ul>
                  </div>
                  <div className="update-btn-bloc">
                    <button
                      className="update-btn"
                      onClick={() => setIsUpdatingPassword(true)}
                    >
                      Modifier mot de passe
                    </button>
                    <button
                      className="update-btn"
                      onClick={() => setIsUpdatingInformations(true)}
                    >
                      Modifier informations
                    </button>
                  </div>
                </section>

                <Biography />
                <Follow />
                <UserPosts />
              </div>
            </>
          )}

          {isUpdatingInformations && (
            <>
              <div className="update-profil">
                <h1>Modifier informations personnelles</h1>
                <form onSubmit={handleInformations}>
                  <div className="update-informations">
                    <label>Nom :</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      defaultValue={userData.lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />

                    <label>Prénom :</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      defaultValue={userData.firstName}
                    />

                    <label>Email :</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={userData.email}
                    />

                    <label>Service :</label>
                    <select
                      name="department"
                      id="department"
                      defaultValue={(options.value = userData.department)}
                      onChange={(e) => setDepartment(e.target.value)}
                    >
                      {options.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="update-form-btn-bloc">
                    <input className="update-form-btn" type="submit" />
                    <button
                      className="update-form-btn"
                      onClick={() => setIsUpdatingInformations(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {isUpdatingPassword && (
            <div className="update-profil">
              <h1>Modifier mot de passe</h1>
              <form>
                <div className="update-informations">
                  <label>Nouveau mot de passe :</label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    onChange={(e) => setnewPassword(e.target.value)}
                  />

                  <label>Confirmer mot de passe :</label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="update-form-btn-bloc">
                  <input
                    className="update-form-btn"
                    type="submit"
                    onClick={handlePassword}
                  />
                  <button
                    className="update-form-btn"
                    onClick={() => setIsUpdatingPassword(false)}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </>
    );
  }
};

export default UserProfil;
