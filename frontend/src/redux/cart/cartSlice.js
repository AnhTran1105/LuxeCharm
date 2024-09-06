import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showCart } from "../cartModal/cartModalSlice";

const initialState = {
  items: [],
  totalPrice: 0,
  isLoggedIn: !!localStorage.getItem("access_token"),
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const { cart } = getState();
    if (cart.isLoggedIn) {
      const response = await axios.get("/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return response;
    } else {
      return (
        JSON.parse(localStorage.getItem("cartItems")) || {
          items: [],
          totalPrice: 0,
        }
      );
    }
  }
);

export const syncCartAfterLogin = createAsyncThunk(
  "cart/syncCartAfterLogin",
  async (_, { dispatch }) => {
    const localCart = JSON.parse(localStorage.getItem("cartItems")) || {
      items: [],
      totalPrice: 0,
    };

    if (localCart.items.length > 0) {
      for (const item of localCart.items) {
        await dispatch(handleAddToCart(item));
      }
      localStorage.removeItem("cartItems");
    }

    return await dispatch(fetchCart()).unwrap();
  }
);

export const handleAddToCart = createAsyncThunk(
  "cart/handleAddToCart",
  async (item, { getState, dispatch }) => {
    const { cart } = getState();
    if (cart.isLoggedIn) {
      console.log(item);
      try {
        await axios.post(
          "/cart",
          {
            product: {
              _id: item._id,
              name: item.name,
              price: item.price,
              imageUrl: item.imageUrls[0],
            },
            metal: item.metals[0].metal,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
      dispatch(showCart());
    } else {
      dispatch(showCart());
    }
    await dispatch(fetchCart());
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartItemId, quantity }, { getState, dispatch }) => {
    const { cart } = getState();
    if (cart.isLoggedIn) {
      await axios.put(
        `/cart/quantity`,
        { cartItemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
    }

    await dispatch(fetchCart());
    return { cartItemId, quantity };
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartItemId, { getState, dispatch }) => {
    const { cart } = getState();
    if (cart.isLoggedIn) {
      await axios.delete(`/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    }
    await dispatch(fetchCart());
    return cartItemId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addCase(handleAddToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItemIndex = state.items.findIndex(
          (item) => item._id === newItem._id && item.metal === newItem.metal
        );
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          state.items.push(newItem);
        }
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        if (!state.isLoggedIn) {
          localStorage.setItem(
            "cartItems",
            JSON.stringify({ items: state.items, totalPrice: state.totalPrice })
          );
        }
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const { cartItemId, quantity } = action.payload;
        const item = state.items.find((item) => item._id === cartItemId);
        if (item) {
          item.quantity = quantity;
          state.totalPrice = state.items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
        }
        if (!state.isLoggedIn) {
          localStorage.setItem(
            "cartItems",
            JSON.stringify({ items: state.items, totalPrice: state.totalPrice })
          );
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
        if (!state.isLoggedIn) {
          localStorage.setItem(
            "cartItems",
            JSON.stringify({ items: state.items, totalPrice: state.totalPrice })
          );
        }
      })
      .addCase(syncCartAfterLogin.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { setIsLoggedIn, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
