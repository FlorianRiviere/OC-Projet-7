import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import { options } from "../departments";
import { updateUserInformations } from "../../feature/userSlice";

function UpdateInfos({ setIsUpdatingInformations }) {
  const uid = useContext(UidContext);

  const dispatch = useDispatch;
  const userData = useSelector((state) => state.user.user);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

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

  return (
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
  );
}

export default UpdateInfos;
