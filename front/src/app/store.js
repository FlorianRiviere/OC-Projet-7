import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../feature/usersSlice";
import userReducer from "../feature/userSlice";
import postsReducer from "../feature/postsSlice";
import commentsReducer from "../feature/commentsSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
