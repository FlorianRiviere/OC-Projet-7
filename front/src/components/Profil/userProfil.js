import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../feature/userSlice";
import { updateUser } from "../../feature/userSlice";
import { UidContext } from "../../components/AppContext";
import { options } from "../../components/departments";

const UserProfil = () => {
  const uid = useContext(UidContext);

  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [isUpdatingInformations, setIsUpdatingInformations] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isUpdatingBiography, setIsUpdatingBiography] = useState(false);

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [biography, setBiography] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadUser, setLoadUser] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  // Récupérer utilisateur

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

  // Gérer Modifications

  const handleImage = (e) => {};

  const handleInformations = (e) => {
    e.preventDefault();
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
      .then((res) => {
        dispatch(getUserData(res.data));
        alert("Informations modifié");
        setIsUpdatingInformations(false);
      })
      .catch((err) => console.log(err));
  };

  const handlePassword = (e) => {};

  const handleBiography = (e) => {};

  if (loadUser === false) {
    return (
      <>
        <main>
          {isUpdatingInformations === false && isUpdatingPassword === false && (
            <>
              <h1 className="main-title">Profil de {userData.firstName}</h1>
              <div className="profil">
                {/* Image */}

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
                          />
                        </form>
                      </>
                    )}
                  </div>
                </section>

                <section className="informations">
                  <h2>Informations</h2>
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
                          <input className="biography-btn" type="submit" />
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

          {/* Modifier informations */}

          {isUpdatingInformations && (
            <>
              <div className="update-profil">
                <h1>Modifier profil</h1>
                <form>
                  <div className="update-informations">
                    <label>Nom :</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      onChange={(e) => setLastName(e.target.value)}
                      value={userData.lastName}
                    />

                    <label>Prénom :</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={userData.firstName}
                    />

                    <label>Email :</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={userData.email}
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
                    <input
                      className="update-form-btn"
                      type="submit"
                      onClick={handleInformations}
                    />
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
                  <label>Mot de passe :</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />

                  <label>Confirmer mot de passe :</label>
                  <input
                    type="password"
                    name="password"
                    id="conf-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
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
