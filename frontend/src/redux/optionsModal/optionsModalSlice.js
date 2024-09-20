import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
  productId: null,
  metal: null,
};

const optionsModalSlice = createSlice({
  name: "optionsModal",
  initialState,
  reducers: {
    openOptionsModal: (state, action) => {
      state.isOpened = true;
      state.productId = action.payload.productId;
      state.metal = action.payload.metal;
    },
    closeOptionsModal: (state) => {
      state.isOpened = false;
      state.productId = null;
      state.metal = null;
    },
  },
});
export const { openOptionsModal, closeOptionsModal } =
  optionsModalSlice.actions;

export default optionsModalSlice.reducer;
