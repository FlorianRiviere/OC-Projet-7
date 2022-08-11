import React from "react";
import { useSelector } from "react-redux";

import Like from "../../../assets/icons/thumbs-up-regular.svg";
import Dislike from "../../../assets/icons/thumbs-down-regular.svg";

function PostComments({ unrolledComments }) {
  const usersData = useSelector((state) => state.users.users);
  const commentsData = useSelector((state) => state.comments.comments);

  if (usersData !== null && commentsData !== null) {
    return (
      <>
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
      </>
    );
  }
}

export default PostComments;
