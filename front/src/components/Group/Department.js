import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import { options } from "../departments";
import FollowButton from "../User/followButton";

function Department() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);

  const [department, setDepartment] = useState("");

  if (usersData !== null) {
    return (
      <>
        <main>
          <div className="department-page">
            {department === "" && (
              <>
                <h1>Services de l'entreprise</h1>
                <div className="selection">
                  <label htmlFor="department"></label>
                  <select
                    name="department"
                    id="department"
                    onChange={(e) => setDepartment(e.target.value)}
                    value={department}
                  >
                    {options.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            {department !== "" && (
              <>
                <h1>Service {department}</h1>
                <div className="selection">
                  <label htmlFor="department"></label>
                  <select
                    name="department"
                    id="department"
                    onChange={(e) => setDepartment(e.target.value)}
                    value={department}
                  >
                    {options.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <section>
                  <h2>Membres</h2>
                  <div className="members">
                    {usersData.map(
                      (users) =>
                        users.department === department && (
                          <div className="author-card-bloc" key={users._id}>
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
                              {users._id !== uid && (
                                <FollowButton user={userData} users={users} />
                              )}
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </section>
              </>
            )}
          </div>
        </main>
      </>
    );
  }
}

export default Department;
