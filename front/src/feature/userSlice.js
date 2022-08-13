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
    updateUserInformations: (state, action) => {},
    updateUserBio: (state, action) => {
      state.user.biography = action.payload;
    },
  },
});

export const { getUserData, updateUserInformations, updateUserBio } =
  userSlice.actions;
export default userSlice.reducer;
