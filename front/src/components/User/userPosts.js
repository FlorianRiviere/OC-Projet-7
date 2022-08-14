import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NewComment from "../Comment/newComment";
import PostComments from "../Comment/postComments";
import PostLike from "../Post/PostCard/postLike";
import PostRemove from "../Post/PostCard/postRemove";
import PostUpdateContent from "../Post/PostCard/postUpdateContent";
import PostUpdateInteraction from "../Post/PostCard/postUpdateInteraction";
import UserCard from "./userCard";

function UserPosts() {
  let paramsId = useParams();

  const userData = useSelector((state) => state.user.user);
  const usersData = useSelector((state) => state.users.users);
  const postsData = useSelector((state) => state.posts.posts);
  const commentsData = useSelector((state) => state.comments.comments);

  const [unrolledComments, setUnrolledComments] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [postId, setPostId] = useState("");
  const [picture, setPicture] = useState("");
  const [content, setContent] = useState("");

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
                  post.author === paramsId.id && (
                    <article key={post._id}>
                      <UserCard post={post} />

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
                        <>
                          <PostUpdateContent
                            post={post}
                            setContent={setContent}
                            setPicture={setPicture}
                          />
                        </>
                      )}

                      {(userData._id === post.author ||
                        userData.isAdmin === true) && (
                        <div className="post-interaction">
                          <PostUpdateInteraction
                            post={post}
                            updatePost={updatePost}
                            setUpdatePost={setUpdatePost}
                            postId={postId}
                            setPostId={setPostId}
                            picture={picture}
                            setPicture={setPicture}
                            content={content}
                            setContent={setContent}
                            setDeletePost={setDeletePost}
                          />

                          <PostRemove
                            post={post}
                            setUpdatePost={setUpdatePost}
                            postId={postId}
                            setPostId={setPostId}
                            deletePost={deletePost}
                            setDeletePost={setDeletePost}
                          />
                        </div>
                      )}

                      <div className="interaction">
                        <PostLike
                          post={post}
                          postId={postId}
                          setPostId={setPostId}
                        />

                        <div className="comment-interaction">
                          {(unrolledComments === false ||
                            postId !== post._id) && (
                            <button
                              onClick={() => {
                                setUnrolledComments(true);
                                setPostId(post._id);
                              }}
                            >
                              Afficher les commentaires
                            </button>
                          )}
                          {unrolledComments === true && postId === post._id && (
                            <button
                              onClick={() => {
                                setUnrolledComments(false);
                                setNewComment(false);
                                setPostId("");
                              }}
                            >
                              Masquer les commentaires
                            </button>
                          )}
                          {(newComment === false || postId !== post._id) && (
                            <button
                              onClick={() => {
                                setUnrolledComments(true);
                                setNewComment(true);
                                setPostId(post._id);
                              }}
                            >
                              Ajouter un commentaire
                            </button>
                          )}
                          {newComment === true && postId === post._id && (
                            <button
                              onClick={() => {
                                setNewComment(false);
                              }}
                            >
                              Annuler
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="comments">
                        {newComment === true && postId === post._id && (
                          <NewComment post={post} />
                        )}
                        {commentsData &&
                          unrolledComments === true &&
                          postId === post._id && <PostComments post={post} />}
                      </div>
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
