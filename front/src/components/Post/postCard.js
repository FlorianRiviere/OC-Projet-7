import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUsersData } from "../../feature/usersSlice";
import { getPostsData } from "../../feature/postsSlice";
import { getCommentsData } from "../../feature/commentsSlice";
import Like from "../../assets/icons/thumbs-up-regular.svg";
import Dislike from "../../assets/icons/thumbs-down-regular.svg";

function PostCard() {
  const [loadUsers, setLoadUsers] = useState(true);
  const [loadPosts, setLoadPosts] = useState(true);
  const [loadComments, setLoadComments] = useState(true);
  const dispatch = useDispatch();

  const [unrolledComments, setUnrolledComments] = useState(false);

  //   Récupération des données

  useEffect(() => {
    if (loadUsers === true) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/users`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getUsersData(res.data));
          setLoadUsers(false);
        })
        .catch((err) => console.log(err));
    }
    if (loadPosts === true) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getPostsData(res.data));
          setLoadPosts(false);
        })
        .catch((err) => console.log(err));
    }
    if (loadComments === true) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/comments`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getCommentsData(res.data));
          setLoadComments(false);
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, loadUsers, loadPosts, loadComments]);

  const usersData = useSelector((state) => state.users.users);
  const postsData = useSelector((state) => state.posts.posts);
  const commentsData = useSelector((state) => state.comments.comments);

  if (loadUsers === false && loadPosts === false && loadComments === false) {
    for (let i = 0; i < postsData.length; i++) {
      console.log(i);

      const postAuthor = usersData.find((_id) => (_id = postsData[i].author));

      const postComments = commentsData.find(
        (postId) => (postId = postsData[i]._id)
      );

      console.log(postComments);

      return (
        <article>
          <div className="author-card">
            <div className="author-image">
              <img
                src={postAuthor.picture}
                alt="Pastille de l'auteur de la publication"
              ></img>
            </div>
            <div className="author-informations">
              <div className="name">
                {postAuthor.firstName} {postAuthor.lastName}
              </div>
              <div className="department">
                Service : {postAuthor.department}
              </div>
            </div>
          </div>
          <div className="post-content">
            <div className="post-text">{postsData[i].content}</div>
            {postsData[i].picture && (
              <div className="post-image">
                <img
                  src={postsData[i].picture}
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
              {!postComments && (
                <div className="about-comment">
                  <p>Pas de commentaires</p>
                </div>
              )}
              {postComments && unrolledComments === false && (
                <button onClick={() => setUnrolledComments(true)}>
                  Afficher les commentaires
                </button>
              )}
              {postComments && unrolledComments === true && (
                <button onClick={() => setUnrolledComments(false)}>
                  Masquer les commentaires
                </button>
              )}
              <button>Ajouter un commentaire</button>
            </div>
          </div>

          {postComments && unrolledComments === true && (
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
              <div className="comment-content">{postComments.content}</div>
              <div className="comment-interaction">
                <div className="like-bloc">
                  <img src={Like} alt="Bouton j'aime"></img>
                  <img src={Dislike} alt="Bouton je n'aime pas"></img>
                </div>
                <div className="comment-interaction">
                  <button>Modifier le commentaire</button>
                  <button>Supprimer le commentaire</button>
                </div>
              </div>
            </div>
          )}
        </article>
      );
    }
  }
}

export default PostCard;
