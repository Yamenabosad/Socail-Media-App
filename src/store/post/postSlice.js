import { createSlice } from "@reduxjs/toolkit";
import { addNewPost, deletePost, editPost, getAllPosts } from "./postActions";

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  error: null,
  currentPage: 1,
  hasMore: true,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = [...state.posts, ...action.payload.data];
        state.currentPage = action.payload.page;
        // If fewer than 5 posts are returned, we've reached the end
        if (action.payload.data.length < 5) {
          state.hasMore = false;
        }
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Add new post
      .addCase(addNewPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.isLoading = false;

        state.posts.push(action.payload); // Add new post to state
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Edit post
      .addCase(editPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.isLoading = false;

        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        ); // Find post by id
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the specific post
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;

        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;

        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id
        ); // Correctly remove the deleted post
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export const { resetPosts } = postSlice.actions;
export default postSlice.reducer;
