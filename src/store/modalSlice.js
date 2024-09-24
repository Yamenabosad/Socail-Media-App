import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, componentName: null, postId: null };

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.componentName = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.componentName = null;
      state.postId = null;
    },
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
});

export const { openModal, closeModal, setPostId } = ModalSlice.actions;

export default ModalSlice.reducer;
