import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://tarmeezacademy.com/api/v1";

// Sign-up async thunk with proper FormData handling
export const signUpUser = createAsyncThunk(
  "auth/signup",
  async ({ username, name, email, password, image }, thunkAPI) => {
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("username", username);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (image) {
        formData.append("image", image); // Add the image file if present
      }

      // Make the API call
      const response = await axios.post(`${API_BASE_URL}/register`, formData);

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store user token and info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user));

        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// Login async thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store user token and info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(user));

        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
