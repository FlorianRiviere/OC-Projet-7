import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../components/AppContext";
import { getUserData } from "../../feature/userSlice";
import { getUsersData } from "../../feature/usersSlice";
import { getPostsData } from "../../feature/postsSlice";
import { getCommentsData } from "../../feature/commentsSlice";
import Liked from "../../assets/icons/thumbs-up-solid.svg";
import Disliked from "../../assets/icons/thumbs-down-solid.svg";
import Like from "../../assets/icons/thumbs-up-regular.svg";
import Dislike from "../../assets/icons/thumbs-down-regular.svg";

function PostCard() {
  const uid = useContext(UidContext);

  const [api, setApi] = useState(false);

  const dispatch = useDispatch();

  const [unrolledComments, setUnrolledComments] = useState(false);

  const [updatePost, setUpdatePost] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [postId, setPostId] = useState("");
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");
  const [like, setLike] = useState("");
  const [sendLike, setSendLike] = useState(false);

  //   Récupération des données

  useEffect(() => {
    const getInformations = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getUserData(res.data));
        })
        .catch((err) => console.log(err));

      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/users`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getUsersData(res.data));
        })
        .catch((err) => console.log(err));

      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getPostsData(res.data));
        })
        .catch((err) => console.log(err));

      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/comments`,
        withCredentials: true,
      })
        .then((res) => {
          dispatch(getCommentsData(res.data));
        })
        .catch((err) => console.log(err));
      setApi(true);
    };
    getInformations();
  }, [dispatch, uid]);

  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);
  const postsData = useSelector((state) => state.posts.posts);
  const commentsData = useSelector((state) => state.comments.comments);

  // Modification d'un post

  const handlePost = (e) => {
    e.preventDefault();

    if (picture) {
      const data = new FormData();

      data.append("content", content);
      data.append("image", picture);

      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
        withCredentials: true,
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          // dispatch(updateUserInformations);
          alert("Informations modifiées");
          setUpdatePost(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
        withCredentials: true,
        data: { content },
      })
        .then(() => {
          // dispatch(updateUserInformations);
          alert("Informations modifiées");
          setUpdatePost(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  // Supprimer un post

  const handleDeletePost = (e) => {
    e.preventDefault();

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/posts/${postId}`,
      withCredentials: true,
    })
      .then(() => {
        // dispatch(updateUserInformations);
        alert("Publication supprimée !");
        setUpdatePost(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Gestion des likes

  if (sendLike === true) {
    const handleLikes = async () => {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/posts/${postId}/like`,
        withCredentials: true,
        data: {
          userId: uid,
          like,
        },
      })
        .then(() => {
          // dispatch(updateUserInformations);
          console.log(postId, like);
          setPostId("");
          setLike("");
          setSendLike(false);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    };
    handleLikes();
  }

  if (api === true) {
    return (
      <>
        {postsData.map((post) => {
          return (
            <article key={post._id}>
              {usersData.map(
                (user) =>
                  user._id === post.author && (
                    <div className="author-card" key={user._id}>
                      <div className="author-image">
                        <img
                          src={user.picture}
                          alt="Pastille de l'auteur de la publication"
                        ></img>
                      </div>
                      <div className="author-informations">
                        <div className="name">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="department">
                          Service {user.department}
                        </div>
                      </div>
                    </div>
                  )
              )}

              {(updatePost === false || postId !== post._id) && (
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
              )}

              {updatePost === true && postId === post._id && (
                <form id="update-post">
                  <div className="post-content">
                    <label htmlFor="content"></label>
                    <textarea
                      name="content"
                      id="content"
                      defaultValue={post.content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>

                    {post.picture && (
                      <div className="post-image">
                        <img
                          src={post.picture}
                          alt="Illustration de la publication"
                        ></img>
                        {uploadImage === false && (
                          <button
                            className="edit-post-btn"
                            onClick={() => setUploadImage(true)}
                          >
                            Modifier l'image
                          </button>
                        )}
                      </div>
                    )}

                    {!post.picture && (
                      <div className="post-image">
                        {uploadImage === false && (
                          <button
                            className="edit-post-btn"
                            onClick={() => setUploadImage(true)}
                          >
                            Ajouter une image
                          </button>
                        )}
                      </div>
                    )}

                    {uploadImage === true && (
                      <>
                        <div className="post-image">
                          <label htmlFor="file"></label>
                          <input
                            type="file"
                            id="file"
                            className="choose-image"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => setPicture(e.target.files[0])}
                          />
                          <div className="edit-post-btn-bloc">
                            <button
                              className="edit-post-btn"
                              onClick={() => {
                                setUploadImage(false);
                                setPicture(post.picture);
                              }}
                            >
                              Annuler
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </form>
              )}

              {(userData._id === post.author || userData.isAdmin === true) && (
                <div className="post-interaction">
                  {updatePost === false && (
                    <button
                      onClick={() => {
                        setUpdatePost(true);
                        setDeletePost(false);
                        setPostId(post._id);
                        setContent(post.content);
                        setPicture(post.picture);
                      }}
                    >
                      Modifier la publication
                    </button>
                  )}

                  {updatePost === true && postId !== post._id && (
                    <button
                      onClick={() => {
                        setPostId(post._id);
                        setContent(post.content);
                        setPicture(post.picture);
                      }}
                    >
                      Modifier la publication
                    </button>
                  )}

                  {updatePost === true && postId === post._id && (
                    <div className="update-post-interaction">
                      <input
                        className="update-post-btn"
                        form="update-post"
                        type="submit"
                        onClick={handlePost}
                        value="Valider"
                      />
                      <button
                        className="update-post-btn"
                        onClick={() => {
                          setUpdatePost(false);
                          setPostId("");
                          setContent("");
                          setPicture("");
                        }}
                      >
                        Annuler
                      </button>
                    </div>
                  )}

                  {(post._id !== postId || deletePost === false) && (
                    <button
                      onClick={() => {
                        setDeletePost(true);
                        setUpdatePost(false);
                        setPostId(post._id);
                      }}
                    >
                      Supprimer la publication
                    </button>
                  )}
                  {deletePost === true && postId === post._id && (
                    <div className="delete-post-interaction">
                      <p>Voulez-vous vraiment supprimer cette publication ?</p>
                      <button
                        className="delete-post-btn"
                        onClick={handleDeletePost}
                      >
                        Confirmer
                      </button>
                      <button
                        className="delete-post-btn"
                        onClick={() => {
                          setDeletePost(false);
                          setPostId("");
                        }}
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="interaction">
                <div className="like-bloc">
                  <div>
                    <p>{post.likes}</p>
                    {!post.usersLiked.includes(uid) && (
                      <button
                        className="like-btn"
                        onClick={() => {
                          setLike(1);
                          setPostId(post._id);
                          setSendLike(true);
                        }}
                      >
                        <img src={Like} alt="Bouton j'aime"></img>
                      </button>
                    )}
                    {post.usersLiked.includes(uid) && (
                      <button
                        className="like-btn"
                        onClick={() => {
                          setLike(0);
                          setPostId(post._id);
                          setSendLike(true);
                        }}
                      >
                        <img src={Liked} alt="Bouton j'aime"></img>
                      </button>
                    )}
                  </div>
                  <div>
                    <p>{post.dislikes}</p>
                    {!post.usersDisliked.includes(uid) && (
                      <button
                        className="dislike-btn"
                        onClick={() => {
                          setLike(-1);
                          setPostId(post._id);
                          setSendLike(true);
                        }}
                      >
                        <img src={Dislike} alt="Bouton je n'aime pas"></img>
                      </button>
                    )}
                    {post.usersDisliked.includes(uid) && (
                      <button
                        className="dislike-btn"
                        onClick={() => {
                          setLike(0);
                          setPostId(post._id);
                          setSendLike(true);
                        }}
                      >
                        <img src={Disliked} alt="Bouton je n'aime pas"></img>
                      </button>
                    )}
                  </div>
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
                  <div className="comment-content">{commentsData.content}</div>
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
        })}
      </>
    );
  }
}

export default PostCard;
