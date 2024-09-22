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
            item.metalType === localItem.metalType
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

      localStorage.removeItem("cartItems");
    }

    return backendCart;
  }
);

export const handleAddToCart = createAsyncThunk(
  "cart/handleAddToCart",
  async (item, { getState, dispatch }) => {
    console.log(item);
    const { cart } = getState();

    if (cart.isLoggedIn) {
      await axios.post(
        "/cart",
        { item },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(fetchCart());
    } else {
      const existingItemIndex = cart.items.findIndex(
        (cartItem) =>
          cartItem.productId === item._id &&
          cartItem.metalType === item.metalType
      );
      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = cart.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedItems = [
          ...cart.items,
          {
            productId: item._id,
            quantity: item.quantity,
            metalType: item.metalType,
            priceAtPurchase: item.price,
            salePriceAtPurchase: item.salePrice,
          },
        ];
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

// Update item quantity in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, metalType }, { getState, dispatch }) => {
    const { cart } = getState();

    if (cart.isLoggedIn) {
      await axios.put(
        `/cart/quantity`,
        { productId, quantity, metalType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      dispatch(fetchCart());
    } else {
      const updatedItems = cart.items.map((item) =>
        item.productId === productId && item.metalType === metalType
          ? { ...item, quantity }
          : item
      );
      const totalPrice = updatedItems.reduce(
        (total, item) =>
          total +
          (item.salePriceAtPurchase || item.priceAtPurchase) * item.quantity,
        0
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify({ items: updatedItems, totalPrice })
      );
      dispatch(updateCart({ items: updatedItems, totalPrice }));
    }
  }
);

// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, metalType }, { getState, dispatch }) => {
    const { cart } = getState();

    if (cart.isLoggedIn) {
      await axios.delete(`/cart`, {
        data: { productId, metalType },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      dispatch(fetchCart());
    } else {
      const updatedItems = cart.items.filter(
        (item) => item.productId !== productId || item.metalType !== metalType
      );
      const totalPrice = updatedItems.reduce(
        (total, item) =>
          total +
          (item.salePriceAtPurchase || item.priceAtPurchase) * item.quantity,
        0
      );

      localStorage.setItem(
        "cartItems",
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

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
