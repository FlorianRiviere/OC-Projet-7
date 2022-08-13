import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import Like from "../../assets/icons/thumbs-up-solid.svg";
import Dislike from "../../assets/icons/thumbs-down-solid.svg";
import UserCard from "./userCard";

function UserPosts() {
  const uid = useContext(UidContext);

  const usersData = useSelector((state) => state.users.users);
  const postsData = useSelector((state) => state.posts.posts);
  const commentsData = useSelector((state) => state.comments.comments);

  const [unrolledComments, setUnrolledComments] = useState(false);

  if (usersData !== null && postsData !== null && commentsData !== null) {
    return (
      <>
        <section className="user-posts">
          <h2>Publications</h2>
          <div className="posts">
            {postsData
              .slice(0)
              .reverse()
              .map(
                (post) =>
                  post.author === uid && (
                    <article key={post._id}>
                      <UserCard />
                      <div className="post-content">
                        <div className="post-text">{post.content}</div>
                        {post.picture && (
                          <div className="post-image">
                            <img
                              src={post.picture}
                              alt="Illustration de la publication"
                            ></img>
                          </div>
                        )}
                      </div>

                      <div className="post-interaction">
                        <button>Modifier la publication</button>
                        <button>Supprimer la publication</button>
                      </div>
                      <div className="interaction">
                        <div className="like-bloc">
                          <img src={Like} alt="Bouton j'aime"></img>
                          <img src={Dislike} alt="Bouton je n'aime pas"></img>
                        </div>
                        <div className="comment-interaction">
                          {!commentsData && (
                            <div className="about-comment">
                              <p>Pas de commentaires</p>
                            </div>
                          )}
                          {commentsData && unrolledComments === false && (
                            <button onClick={() => setUnrolledComments(true)}>
                              Afficher les commentaires
                            </button>
                          )}
                          {commentsData && unrolledComments === true && (
                            <button onClick={() => setUnrolledComments(false)}>
                              Masquer les commentaires
                            </button>
                          )}
                          <button>Ajouter un commentaire</button>
                        </div>
                      </div>

                      {commentsData && unrolledComments === true && (
                        <div className="comments-card">
                          <div className="comments-author-card">
                            <div className="author-image">
                              <img
                                src={usersData.picture}
                                alt="Pastille de l'auteur du commentaire"
                              ></img>
                            </div>
                            <div className="name">
                              {usersData.firstName + usersData.lastName}
                            </div>
                          </div>
                          <div className="comment-content">
                            {commentsData.content}
                          </div>
                          <div className="comment-interaction">
                            <div className="like-bloc">
                              <img src={Like} alt="Bouton j'aime"></img>
                              <img
                                src={Dislike}
                                alt="Bouton je n'aime pas"
                              ></img>
                            </div>
                            <div className="comment-interaction">
                              <button>Modifier le commentaire</button>
                              <button>Supprimer le commentaire</button>
                            </div>
                          </div>
                        </div>
                      )}
                    </article>
                  )
              )}
          </div>
        </section>
      </>
    );
  }
}

export default UserPosts;
