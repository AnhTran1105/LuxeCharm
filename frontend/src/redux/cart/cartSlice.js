import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showCart } from "../cartModal/cartModalSlice";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  isLoggedIn: !!localStorage.getItem("access_token"),
};

export const handleAddToCart = createAsyncThunk(
  "cart/handleAddToCart",
  async (item, { getState, dispatch }) => {
    const state = getState();

    if (state.cart.isLoggedIn) {
      try {
        await axios.post(
          "/cart",
          {
            productId: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
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
      return item;
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

export const loginAndMigrateCart = createAsyncThunk(
  "cart/loginAndMigrateCart",
  async (_, { dispatch }) => {
    dispatch(setIsLoggedIn(true));
    await dispatch(migrateCartToBackend());
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((i) => i.product._id === productId);

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
          try {
            const response = await axios.post(
              "/cart",
              {
                productId: item.product._id,
                quantity: item.quantity,
                price: item.product.price,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`,
                },
              }
            );
            console.log(response);
            localStorage.removeItem("cartItems");
          } catch (error) {
            console.error(error);
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleAddToCart.fulfilled, (state, action) => {
      const item = action.payload;
      console.log(item);
      const existingItem = state.items.find((i) => i._id === item.product._id);

      if (existingItem) {
        existingItem.quantity += 1;
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
