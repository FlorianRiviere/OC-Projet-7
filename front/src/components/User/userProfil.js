import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../feature/userSlice";
import { updateUserInformations } from "../../feature/userSlice";
import { UidContext } from "../AppContext";
import { options } from "../departments";

const UserProfil = () => {
  const uid = useContext(UidContext);

  const dispatch = useDispatch();
  const [loadingUser, setLoadingUser] = useState(true);

  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdatingInformations, setIsUpdatingInformations] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingBiography, setIsUpdatingBiography] = useState(false);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");
  const [picture, setPicture] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Récupérer utilisateur

  useEffect(() => {
    if (loadingUser === true) {
      const getUser = async () => {
        await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
          withCredentials: true,
        })
          .then((res) => {
            dispatch(getUserData(res.data));
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setDepartment(res.data.department);
            setEmail(res.data.email);
            setBiography(res.data.biography);
            setLoadingUser(false);
          })
          .catch((err) => console.log(err));
      };
      getUser();
    } else {
      return;
    }
  }, [dispatch, uid, loadingUser]);

  const userData = useSelector((state) => state.user.user);

  // Modifications images

  const handleImage = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", picture);

    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,

      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        dispatch(updateUserInformations);
        alert("Image modifiée");
        setIsUpdatingImage(false);
        // window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Modifications infos

  const handleInformations = (e) => {
    e.preventDefault();
    if (firstName === undefined) {
      setFirstName(firstName.defaultValue);
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
      .catch((err) => console.log(err));
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

  const handleBiography = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,
      data: {
        biography,
      },
    })
      .then(() => {
        dispatch(updateUserInformations);
        alert("Biographie modifiée");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  if (loadingUser === false) {
    return (
      <>
        <main>
          {isUpdatingInformations === false && isUpdatingPassword === false && (
            <>
              <h1 className="main-title">Profil de {userData.firstName}</h1>
              <div className="profil">
                <section className="image">
                  <h2>Image de profil</h2>
                  <div className="img-bloc">
                    <img src={userData.picture} alt="de profil"></img>
                  </div>
                  <div className="update-image">
                    {isUpdatingImage === false && (
                      <div className="image-btn-bloc">
                        <button
                          className="image-btn"
                          onClick={() => setIsUpdatingImage(true)}
                        >
                          Modifier image
                        </button>
                      </div>
                    )}
                    {isUpdatingImage && (
                      <>
                        <div className="image-btn-bloc">
                          <input
                            type="submit"
                            className="image-btn"
                            value="Valider"
                            onClick={handleImage}
                          />
                          <button
                            className="image-btn"
                            onClick={() => setIsUpdatingImage(false)}
                          >
                            Annuler
                          </button>
                        </div>
                        <form>
                          <label htmlFor="file"></label>
                          <input
                            type="file"
                            id="file"
                            className="choose-image"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => setPicture(e.target.files[0])}
                          />
                        </form>
                      </>
                    )}
                  </div>
                </section>

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

                <section className="biography">
                  <h2>Biographie</h2>
                  {isUpdatingBiography === false && (
                    <div className="biography-bloc">
                      <div className="biography-text">{userData.biography}</div>
                      <div className="biography-btn-bloc">
                        <button
                          className="biography-btn"
                          onClick={() => setIsUpdatingBiography(true)}
                        >
                          Modifier biographie
                        </button>
                      </div>
                    </div>
                  )}
                  {isUpdatingBiography && (
                    <>
                      <div className="biography-bloc">
                        <form className="biography-text">
                          <label htmlFor="biography"></label>
                          <textarea
                            name="biography"
                            id="biography"
                            onChange={(e) => setBiography(e.target.value)}
                          ></textarea>
                        </form>
                        <div className="biography-form-btn-bloc">
                          <input
                            className="biography-btn"
                            type="submit"
                            onClick={handleBiography}
                          />
                          <button
                            className="biography-btn"
                            onClick={() => setIsUpdatingBiography(false)}
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="biography-bloc"></div>
                </section>

                <section className="following">
                  <h2>Abonnés</h2>
                  <div className="following-bloc"></div>
                </section>

                <section className="followers">
                  <h2>Abonnements</h2>
                  <div className="followers-bloc"></div>
                </section>

                <section className="user-posts">
                  <h2>Publications</h2>
                  <div className="posts"></div>
                </section>
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