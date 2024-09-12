import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
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
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || {
        items: [],
        totalPrice: 0,
      };

      if (cartItems.items.length > 0) {
        return { ...cartItems, items: cartItems.items };
      }

      return cartItems;
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

    const response = await axios.get("/cart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    const backendCart = response;

    if (backendCart.items.length === 0 && localCart.items.length > 0) {
      for (const item of localCart.items) {
        await axios.post(
          "/cart",
          {
            product: {
              _id: item.product._id,
              name: item.product.name,
              price: item.product.price,
              imageUrl: item.product.imageUrl,
            },
            metal: item.metal,
            quantity: item.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      }

      localStorage.removeItem("cartItems");
    } else {
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
      try {
        await axios.post(
          "/cart",
          {
            productId: item._id,
            name: item.name,
            price: item.price,
            salePrice: item.salePrice,
            imageUrl: item.metals.find((metal) => metal.metal === item.metal)
              .images.primary,
            metal: item.metal,
            quantity: item.quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        await dispatch(fetchCart());
      } catch (error) {
        console.error(error);
      }
      dispatch(showCart());
    } else {
      const existingItemIndex = cart.items.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      let updatedItems;
      if (existingItemIndex !== -1) {
        updatedItems = cart.items.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + item.quantity,
            };
          }
          return cartItem;
        });
      } else {
        updatedItems = [
          ...cart.items,
          {
            productId: item._id,
            name: item.name,
            price: item.price,
            salePrice: item.salePrice,
            imageUrl: item.metals.find((metal) => metal.metal === item.metal)
              .images.primary,
            metal: item.metal,
            quantity: item.quantity,
          },
        ];
      }

      let totalPrice = 0;

      for (const item of cart.items) {
        totalPrice += (item.salePrice || item.price) * item.quantity;
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify({
          items: updatedItems,
          totalPrice,
        })
      );

      dispatch(
        updateCart({
          items: updatedItems,
          totalPrice,
        })
      );

      dispatch(showCart());
    }
  }
);

export const updateCart = createAction("cart/updateCart");

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
    updateCart: (state, action) => {
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice;
    },
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
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        if (!state.isLoggedIn) {
          const { cartItemId, quantity } = action.payload;
          const itemIndex = state.items.findIndex(
            (item) => item._id === cartItemId
          );

          if (itemIndex !== -1) {
            state.items[itemIndex].quantity = quantity;

            state.totalPrice = state.items.reduce(
              (total, item) =>
                total + (item.salePrice || item.price) * item.quantity,
              0
            );

            localStorage.setItem(
              "cartItems",
              JSON.stringify({
                items: state.items,
                totalPrice: state.totalPrice,
              })
            );
          }
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (!state.isLoggedIn) {
          state.items = state.items.filter(
            (item) => item._id !== action.payload
          );
          state.totalPrice = state.items.reduce(
            (total, item) =>
              total + (item.salePrice || item.price) * item.quantity,
            0
          );

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
