import React, { useContext, useState } from "react";
import { UidContext } from "../../AppContext";

import Like from "../../../assets/icons/thumbs-up-regular.svg";
import Dislike from "../../../assets/icons/thumbs-down-regular.svg";
import Liked from "../../../assets/icons/thumbs-up-solid.svg";
import Disliked from "../../../assets/icons/thumbs-down-solid.svg";
import axios from "axios";

function PostLike({ post, postId, setPostId }) {
  const uid = useContext(UidContext);

  const [like, setLike] = useState("");
  const [sendLike, setSendLike] = useState(false);

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

  return (
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
  );
}

export default PostLike;
