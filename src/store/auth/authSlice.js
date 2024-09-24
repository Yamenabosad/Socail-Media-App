import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, loginUser } from "./authActions";

const initialState = {
  loading: false,
  userInfo: JSON.parse(localStorage.getItem("userInfo") || null),
  userToken: localStorage.getItem("token") || null,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.userInfo = null;
      state.userToken = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      state.isError = false;
      state.isSuccess = true;
      console.log(action.payload);
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload?.response?.data?.message;
      console.log(action.payload?.response?.data?.message);
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      state.isError = false;
      state.isSuccess = true;
      console.log(action);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload?.response?.data?.message;
      console.log(action.payload?.response?.data?.message);
    });
  },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
