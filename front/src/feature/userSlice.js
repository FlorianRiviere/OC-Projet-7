import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    getUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUserData } = userSlice.actions;
export default userSlice.reducer;
