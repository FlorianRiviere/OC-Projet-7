import React from "react";
import NewPost from "./newPost";
import PostCard from "./postCard";

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
