import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
};

const cartSlice = createSlice({
  name: "cart",
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

export const { showCart, hideCart } = cartSlice.actions;
export default cartSlice.reducer;
