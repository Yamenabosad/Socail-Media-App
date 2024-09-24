import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./post/postSlice";
import modal from "./modalSlice";
import authSlice from "./auth/authSlice";
import commentsSlice from "./commentsSlice";
const store = configureStore({
  reducer: { auth: authSlice, post: postSlice, comment: commentsSlice, modal },
  devTools: true,
});

export default store;
