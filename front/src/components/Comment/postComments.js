import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import RemoveComment from "./commentRemove";

import CommentContent from "./commentsContent";

function PostComments({ post }) {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.user.user);
  const commentsData = useSelector((state) => state.comments.comments);
  const usersData = useSelector((state) => state.users.users);

  const [updateComment, setUpdateComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const [commentId, setCommentId] = useState("");

  if (usersData !== null) {
    return (
      <>
        {commentsData.map(
          (comment) =>
            comment.postId === post._id && (
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
                  <CommentContent
                    updateComment={updateComment}
                    comment={comment}
                    commentId={commentId}
                  />
                </div>
                {(comment.author === uid || userData.isAdmin === true) && (
                  <div className="comment-interaction">
                    {(updateComment === false || commentId !== comment._id) && (
                      <button
                        onClick={() => {
                          setUpdateComment(true);
                          setCommentId(comment._id);
                        }}
                      >
                        Modifier le commentaire
                      </button>
                    )}
                    {updateComment === true && commentId === comment._id && (
                      <button
                        onClick={() => {
                          setUpdateComment(false);
                          setCommentId("");
                        }}
                      >
                        Annuler
                      </button>
                    )}
                    <RemoveComment
                      comment={comment}
                      commentId={commentId}
                      setCommentId={setCommentId}
                      deleteComment={deleteComment}
                      setDeleteComment={setDeleteComment}
                      setUpdateComment={setUpdateComment}
                    />
                  </div>
                )}
              </div>
            )
        )}
      </>
    );
  }
}

export default PostComments;
