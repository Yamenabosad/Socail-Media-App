import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async ({ page = 1 }, thunkAPI) => {
    try {
      const res = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`
      );

      return { data: res.data.data, page };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addPost",
  async (postData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("body", postData.body);
      if (postData.image) {
        formData.append("image", postData.image);
      }

      const response = await axios.post(
        "https://tarmeezacademy.com/api/v1/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${postData.userToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (postData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("body", postData.body);
      formData.append("_method", "put");
      if (postData.image) {
        formData.append("image", postData.image);
      }

      const response = await axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${postData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${postData.userToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postData, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://tarmeezacademy.com/api/v1/posts/${postData.id}`,
        {
          headers: {
            Authorization: `Bearer ${postData.userToken}`,
          },
        }
      );
      return response.data; // Return the id of the deleted post
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
