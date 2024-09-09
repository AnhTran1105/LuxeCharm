import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  productId: null,
};

const optionsModalSlice = createSlice({
  name: "optionsModal",
  initialState,
  reducers: {
    openOptionsModal: (state, action) => {
      state.isOpen = true;
      state.productId = action.payload;
    },
    closeOptionsModal: (state) => {
      state.isOpen = false;
      state.productId = null;
    },
  },
});
export const { openOptionsModal, closeOptionsModal } =
  optionsModalSlice.actions;

export default optionsModalSlice.reducer;
