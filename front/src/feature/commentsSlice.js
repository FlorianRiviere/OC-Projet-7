import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    posts: null,
  },
  reducers: {
    getCommentsData: (state, { payload }) => {
      state.posts = payload;
    },
  },
});

export const { getCommentsData } = commentsSlice.actions;

export default commentsSlice.reducer;
