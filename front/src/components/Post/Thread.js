import React from "react";
import NewPost from "./newPost";
import PostCard from "./postCard";

function Thread() {
  return (
    <>
      <main>
        <h1>Publications</h1>
        <div className="new-post">
          <NewPost />
        </div>
        <div className="thread">
          <PostCard />
        </div>
      </main>
    </>
  );
}

export default Thread;
