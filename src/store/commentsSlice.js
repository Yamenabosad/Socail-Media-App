import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  comments: [],
  error: null,
};

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (postId, thunkAPI) => {
    try {
      if (postId === null) return;
      const response = await axios.get(
        `https://tarmeezacademy.com/api/v1/posts/${postId}`
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addComment = createAsyncThunk(
  "comment/addComment",
  async (commentData, thunkAPI) => {
    try {
      const { postId, body, userToken } = commentData;
      const response = await axios.post(
        `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
        {
          body,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    // add extra reducers to handle the getComments async thunk
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload || [];
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action);
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = Array.isArray(state.comments)
          ? [...state.comments, action.payload]
          : [action.payload];
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.log(action);
      });
  },
});

export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;
