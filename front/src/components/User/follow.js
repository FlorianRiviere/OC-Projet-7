import React from "react";
import { useSelector } from "react-redux";
import FollowButton from "./followButton";

function Follow({ user }) {
  const usersData = useSelector((state) => state.users.users);

  return (
    <>
      <section className="following">
        <h2>Personnes suivis</h2>
        <div className="following-bloc">
          {usersData.map((users) => {
            return (
              <div key={users._id}>
                {user.following.includes(users._id) && (
                  <div className="author-card" key={users._id}>
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

                    <FollowButton user={user} users={users} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="followers">
        <h2>Suivi par</h2>
        <div className="followers-bloc">
          {usersData.map((users) => {
            return (
              <div key={users._id}>
                {user.followers.includes(users._id) && (
                  <div className="author-card" key={users._id}>
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

                    <FollowButton user={user} users={users} />
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
