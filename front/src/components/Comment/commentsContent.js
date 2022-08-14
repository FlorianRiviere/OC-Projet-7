import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CommentContent({ updateComment, comment, commentId }) {
  const commentsData = useSelector((state) => state.comments.comments);
  const [content, setContent] = useState("");

  const handleComment = (e) => {
    e.preventDefault();

    if (content) {
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/comments/${comment._id}`,
        withCredentials: true,
        data: { content },
      })
        .then((res) => {
          // dispatch(addPost);
          console.log(res.data);
          alert("Commentaire modifié");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  if (commentsData !== null) {
    return (
      <>
        {(updateComment === false || commentId !== comment._id) && (
          <div className="content">{comment.content}</div>
        )}
        {updateComment === true && commentId === comment._id && (
          <>
            <div className="content">
              <label htmlFor="commentContent"></label>
              <textarea
                name="commentContent"
                id="commentContent"
                defaultValue={comment.content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="comment-btn-bloc">
              <button onClick={handleComment}>Valider</button>
            </div>
          </>
        )}
      </>
    );
  }
}

export default CommentContent;
