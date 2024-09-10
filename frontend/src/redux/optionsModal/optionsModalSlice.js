import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
  productId: null,
};

const optionsModalSlice = createSlice({
  name: "optionsModal",
  initialState,
  reducers: {
    openOptionsModal: (state, action) => {
      state.isOpened = true;
      state.productId = action.payload;
    },
    closeOptionsModal: (state) => {
      state.isOpened = false;
      state.productId = null;
    },
  },
});
export const { openOptionsModal, closeOptionsModal } =
  optionsModalSlice.actions;

export default optionsModalSlice.reducer;
