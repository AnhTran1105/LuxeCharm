import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartAddingSlice = createSlice({
  name: "cartAdding",
  initialState,
  reducers: (addToCart = (state, action) => {}),
});
