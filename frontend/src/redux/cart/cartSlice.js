import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart"))?.items || [],
  totalPrice: JSON.parse(localStorage.getItem("cart"))?.totalPrice || 0,
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
      return response.data;
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || {
        items: [],
        totalPrice: 0,
      };
      return localCart;
    }
  }
);

export const syncCartAfterLogin = createAsyncThunk(
  "cart/syncCartAfterLogin",
  async () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || {
      items: [],
      totalPrice: 0,
    };

    const response = await axios.get("/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    let backendCart = response.data;

    if (localCart.items.length > 0) {
      for (const localItem of localCart.items) {
        const existingItem = backendCart.items.find(
          (item) =>
            item.productId === localItem.productId &&
            item.metalVariantId === localItem.metalVariantId
        );

        if (existingItem) {
          existingItem.quantity += localItem.quantity;
        } else {
          backendCart.items.push(localItem);
        }
      }

      await axios.put(
        "/cart",
        { items: backendCart.items },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      localStorage.removeItem("cart");
    }

    return backendCart;
  }
);

export const handleAddToCart = createAsyncThunk(
  "cart/handleAddToCart",
  async (item, { getState, dispatch }) => {
    const { cart } = getState();

    if (cart.isLoggedIn) {
      await axios.post("/cart", item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(fetchCart());
    } else {
      const existingItemIndex = cart.items.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.metalVariantId === item.metalVariantId
      );
      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = cart.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedItems = [...cart.items, item];
      }

      let totalPrice = updatedItems.reduce(
        (total, cartItem) =>
          total +
          (cartItem.salePriceAtPurchase || cartItem.priceAtPurchase) *
            cartItem.quantity,
        0
      );

      localStorage.setItem(
        "cart",
        JSON.stringify({ items: updatedItems, totalPrice })
      );
      dispatch(updateCart({ items: updatedItems, totalPrice }));
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (item, { getState, dispatch }) => {
    const { cart } = getState();

    if (cart.isLoggedIn) {
      await axios.put(`/cart/quantity`, item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(fetchCart());
    } else {
      const updatedItems = cart.items.map((cartItem) =>
        cartItem.metalVariantId === item.metalVariantId
          ? { ...cartItem, quantity: item.quantity }
          : cartItem
      );
      const totalPrice = updatedItems.reduce(
        (total, cartItem) =>
          total +
          (cartItem.salePriceAtPurchase || cartItem.priceAtPurchase) *
            cartItem.quantity,
        0
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({ items: updatedItems, totalPrice })
      );
      dispatch(updateCart({ items: updatedItems, totalPrice }));
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { getState, dispatch }) => {
    const { cart } = getState();

    if (cart.isLoggedIn) {
      await axios.delete(`/cart`, productId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(fetchCart());
    } else {
      const updatedItems = cart.items.filter(
        (cartItem) => cartItem.productId !== productId
      );
      const totalPrice = updatedItems.reduce(
        (total, cartItem) =>
          total +
          (cartItem.salePriceAtPurchase || cartItem.priceAtPurchase) *
            cartItem.quantity,
        0
      );

      localStorage.setItem(
        "cart",
        JSON.stringify({ items: updatedItems, totalPrice })
      );
      dispatch(updateCart({ items: updatedItems, totalPrice }));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
        state.loading = false;
      })
      .addCase(syncCartAfterLogin.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(handleAddToCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        }
      );
  },
});

export const { updateCart, setIsLoggedIn } = cartSlice.actions;
export default cartSlice.reducer;
