import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
};

const cartModalSlice = createSlice({
  name: "cartModal",
  initialState,
  reducers: {
    showCart: (state) => {
      state.isShow = true;
    },
    hideCart: (state) => {
      state.isShow = false;
    },
  },
});

export const { showCart, hideCart } = cartModalSlice.actions;
export default cartModalSlice.reducer;
