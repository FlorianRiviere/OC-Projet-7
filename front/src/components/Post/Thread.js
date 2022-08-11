import React from "react";
import NewPost from "./NewPost/newPost";
import PostCard from "./PostCard/PostCard";

function Thread() {
  return (
    <>
      <main>
        <h1>Publications</h1>

        <div className="new-post">
          <section>
            <NewPost />
          </section>
        </div>

        <div className="thread">
          <section>
            <PostCard />
          </section>
        </div>
      </main>
    </>
  );
}

export default Thread;
