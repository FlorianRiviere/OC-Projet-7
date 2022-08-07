import { createSlice } from "@reduxjs/toolkit";

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: null,
  },
  reducers: {
    getCommentsData: (state, { payload }) => {
      state.comments = payload;
    },
  },
});

export const { getCommentsData } = commentsSlice.actions;

export default commentsSlice.reducer;
