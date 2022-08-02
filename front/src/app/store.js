import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../feature/usersSlice";
import userReducer from "../feature/userSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
  },
});
