import React from "react";
import { useSelector } from "react-redux";

import CommentContent from "./commentsContent";

function PostComments({ unrolledComments, post, postId }) {
  const usersData = useSelector((state) => state.users.users);
  const commentsData = useSelector((state) => state.comments.comments);

  if (usersData !== null && commentsData !== null) {
    return (
      <>
        {commentsData && unrolledComments === true && postId === post._id && (
          <>
            {commentsData.map(
              (comment) =>
                comment.postId === postId._id && (
                  <div className="comment-card" key={comment._id}>
                    <div className="comment-author">
                      {usersData.map(
                        (author) =>
                          author._id === comment.author && (
                            <div className="author-card" key={author._id}>
                              <a href={`/profil/${author._id}`}>
                                <div className="author-image">
                                  <img
                                    src={author.picture}
                                    alt="Pastille de l'auteur de la publication"
                                  ></img>
                                </div>
                                <div className="author-informations">
                                  <div className="name">
                                    {author.firstName} {author.lastName}
                                  </div>
                                  <div className="department">
                                    Service {author.department}
                                  </div>
                                </div>
                              </a>
                            </div>
                          )
                      )}
                    </div>
                    <div className="comment-content">
                      <CommentContent />
                    </div>
                    <div className="comment-interaction">
                      <button>Modifier le commentaire</button>
                      <button>Supprimer le commentaire</button>
                    </div>
                  </div>
                )
            )}
          </>
        )}
      </>
    );
  }
}

export default PostComments;
