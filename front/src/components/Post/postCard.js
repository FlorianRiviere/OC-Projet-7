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
  const usersData = useSelector((state) => state.users.users);
  const postsData = useSelector((state) => state.posts.posts);
  const commentsData = useSelector((state) => state.comments.comments);

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

  if (loadUsers === false && loadPosts === false && loadComments === false) {
    for (let i = 0; i < postsData.length; i++) {
      return (
        <article>
          <div className="author-card">
            <div className="author-image">
              <img
                src={usersData.picture}
                alt="Pastille de l'auteur de la publication"
              ></img>
            </div>
            <div className="informations">
              <div className="name">
                {usersData.firstName + usersData.lastName}
              </div>
              <div className="department">Service: {usersData.department}</div>
            </div>
          </div>

          <div className="post-content">
            <div className="post-image">
              <img
                src={postsData.picture}
                alt="Illustration de la publication"
              ></img>
            </div>
            <div className="post-text">{usersData.content}</div>
          </div>

          <div className="interaction">
            <div className="post-interaction">
              <button>Modifier la publication</button>
              <button>Supprimer la publication</button>
            </div>
            <div className="like-bloc">
              <Like />
              <Dislike />
            </div>
            <div className="comment-interaction">
              <button>Afficher les commentaires</button>
              <button>Ajouter un commentaire</button>
            </div>
          </div>

          <div className="comments-card">
            <div className="comments-author-card">
              <div className="author-image">
                <img
                  src={usersData.picture}
                  alt="Pastille de l'auteur de la publication"
                ></img>
              </div>
              <div className="name">
                {usersData.firstName + usersData.lastName}
              </div>
            </div>
            <div className="comment-content">{commentsData.content}</div>
            <div className="comment-interaction">
              <div className="like-bloc">
                <Like />
                <Dislike />
              </div>
              <div className="comment-interaction">
                <button>Modifier le commentaire</button>
                <button>Supprimer le commentaire</button>
              </div>
            </div>
          </div>
        </article>
      );
    }
  }
}

export default PostCard;
