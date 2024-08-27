import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  isLoggedIn: !!localStorage.getItem("access_token"),
};

export const handleAddToCart = createAsyncThunk(
  "cart/handleAddToCart",
  async (product, { getState }) => {
    const state = getState();
    if (state.cart.isLoggedIn) {
      try {
        const response = await axios.post(
          "/cart",
          {
            productId: product._id,
            quantity: product.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } else {
      return product;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const itemId = action.payload._id;
      state.items = state.items.filter((item) => item._id !== itemId);

      if (!state.isLoggedIn) {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } else {
        axios.delete(`/api/cart/${itemId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    migrateCartToBackend: (state) => {
      if (state.isLoggedIn) {
        state.items.forEach(async (item) => {
          await axios.post("/cart", item, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          });
        });
        localStorage.removeItem("cartItems");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleAddToCart.fulfilled, (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      if (!state.isLoggedIn) {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    });
  },
});

export const {
  removeFromCart,
  clearCart,
  setIsLoggedIn,
  migrateCartToBackend,
} = cartSlice.actions;
export default cartSlice.reducer;
