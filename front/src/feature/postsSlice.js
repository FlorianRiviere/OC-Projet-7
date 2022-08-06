import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    getPostsData: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {},
  },
});

export const { getPostsData, addPost } = postsSlice.actions;

export default postsSlice.reducer;
