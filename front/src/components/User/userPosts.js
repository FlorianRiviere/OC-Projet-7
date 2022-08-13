import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostComments from "../Post/PostCard/postComments";
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
                      <PostComments unrolledComments={unrolledComments} />
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
