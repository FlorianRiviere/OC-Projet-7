import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../feature/userSlice";
import { UidContext } from "../../components/AppContext";

const UserProfil = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [loadUser, setLoadUser] = useState(true);
  const uid = useContext(UidContext);

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

  if (loadUser === false) {
    return (
      <>
        <main>
          {isUpdating === false && (
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
                </section>

                <section className="biography">
                  <h2>Biographie</h2>
                  <div className="biography-bloc"></div>
                </section>

                <div className="update-btn-bloc">
                  <button
                    className="update-btn"
                    onClick={() => setIsUpdating(true)}
                  >
                    Modifier profil
                  </button>
                </div>

                <section className="following">
                  <h2>Personnes suivies</h2>
                  <div className="following-bloc"></div>
                </section>

                <section className="followers">
                  <h2>Personnes qui vous suivent</h2>
                  <div className="followers-bloc"></div>
                </section>

                <section className="user-posts">
                  <h2>Vos publications</h2>
                  <div className="posts"></div>
                </section>
              </div>
            </>
          )}
          {isUpdating && (
            <>
              <div className="update-profil">
                <h1>Modifier profil</h1>
                <form>
                  <div className="update-informations">
                    <label>Nom :</label>
                    <input />

                    <label>Email :</label>
                    <input />

                    <label>Service :</label>
                    <select>
                      <option></option>
                    </select>

                    <label>Biographie :</label>
                    <input />

                    <label>Mot de passe :</label>
                    <input />

                    <label>Confirmer mot de passe :</label>
                    <input />
                  </div>

                  <div className="update-form-btn-bloc">
                    <input className="update-form-btn" type="submit" />
                    <button
                      className="update-form-btn"
                      onClick={() => setIsUpdating(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </main>
      </>
    );
  }
};

export default UserProfil;
