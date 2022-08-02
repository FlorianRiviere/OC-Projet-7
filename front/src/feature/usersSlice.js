import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    getUsersData: (state, { payload }) => {
      state.users = payload;
    },
  },
});

export const { getUsersData } = usersSlice.actions;

export default usersSlice.reducer;
