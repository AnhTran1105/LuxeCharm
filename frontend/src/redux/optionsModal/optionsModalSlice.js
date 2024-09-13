import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
  productId: null,
  defaultMetal: null,
};

const optionsModalSlice = createSlice({
  name: "optionsModal",
  initialState,
  reducers: {
    openOptionsModal: (state, action) => {
      state.isOpened = true;
      state.productId = action.payload.productId;
      state.defaultMetal = action.payload.defaultMetal;
    },
    closeOptionsModal: (state) => {
      state.isOpened = false;
      state.productId = null;
      state.defaultMetal = null;
    },
  },
});
export const { openOptionsModal, closeOptionsModal } =
  optionsModalSlice.actions;

export default optionsModalSlice.reducer;
