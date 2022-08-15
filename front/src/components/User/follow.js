import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import FollowButton from "./followButton";

function Follow({ user }) {
  const uid = useContext(UidContext);

  const usersData = useSelector((state) => state.users.users);

  return (
    <>
      <section className="following">
        <h2>Abonnements</h2>
        <div className="following-bloc">
          {usersData.map((users) => {
            return (
              <div key={users._id}>
                {user.following.includes(users._id) && (
                  <div className="author-card">
                    <a href={`/profil/${users._id}`}>
                      <div className="author-image">
                        <img
                          src={users.picture}
                          alt="Pastille de l'auteur de la publication"
                        ></img>
                      </div>
                      <div className="author-informations">
                        <div className="name">
                          {users.firstName} {users.lastName}
                        </div>
                        <div className="department">
                          Service {users.department}
                        </div>
                      </div>
                    </a>
                    {users._id !== uid && <FollowButton users={users} />}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="followers">
        <h2>Abonnés</h2>
        <div className="followers-bloc">
          {usersData.map((users) => {
            return (
              <div key={users._id}>
                {user.followers.includes(users._id) && (
                  <div className="author-card">
                    <a href={`/profil/${users._id}`}>
                      <div className="author-image">
                        <img
                          src={users.picture}
                          alt="Pastille de l'auteur de la publication"
                        ></img>
                      </div>
                      <div className="author-informations">
                        <div className="name">
                          {users.firstName} {users.lastName}
                        </div>
                        <div className="department">
                          Service {users.department}
                        </div>
                      </div>
                    </a>

                    {users._id !== uid && (
                      <FollowButton user={user} users={users} />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default Follow;
