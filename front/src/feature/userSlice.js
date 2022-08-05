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
    updateUserInformations: (state, action) => {
      state.user = {
        firstName: action.payload,
        lastName: action.payload,
        email: action.payload,
        department: action.payload,
        biography: action.payload,
        picture: action.payload,
        password: action.payload,
      };
    },
  },
});

export const { getUserData, updateUserInformations } = userSlice.actions;
export default userSlice.reducer;
