import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showCart } from "../cartModal/cartModalSlice";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  isLoggedIn: !!localStorage.getItem("access_token"),
};

export const handleAddToCart = createAsyncThunk(
  "cart/handleAddToCart",
  async (product, { getState, dispatch }) => {
    const state = getState();
    if (state.cart.isLoggedIn) {
      try {
        await axios.post(
          "/cart",
          {
            productId: product._id,
            quantity: product.quantity,
            price: product.price,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        dispatch(showCart());
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(showCart());
      return product;
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, price }, { getState, dispatch }) => {
    const state = getState();
    if (state.cart.isLoggedIn) {
      try {
        await axios.put(
          `/cart/quantity`,
          { productId, quantity, price },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(updateQuantity({ productId, quantity }));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i._id === productId);
      if (item) {
        item.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload._id;
      state.items = state.items.filter((item) => item._id !== itemId);

      if (!state.isLoggedIn) {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } else {
        axios.delete(`/cart/${itemId}`, {
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
  updateQuantity,
  removeFromCart,
  clearCart,
  setIsLoggedIn,
  migrateCartToBackend,
} = cartSlice.actions;
export default cartSlice.reducer;
