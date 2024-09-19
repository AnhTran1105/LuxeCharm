import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification/notificationSlice";
import loadingReducer from "./loading/loadingSlice";
import authReducer from "./auth/authSlice";
import modalReducer from "./modal/modalSlice";
import cartModalReducer from "./cartModal/cartModalSlice";
import cartReducer from "./cart/cartSlice";
import optionsModalReducer from "./optionsModal/optionsModalSlice";
import searchModalReducer from "./searchModal/searchModalSlice";
import { authMiddleware } from "./middleware/authMiddleware";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    loading: loadingReducer,
    auth: authReducer,
    modal: modalReducer,
    cartModal: cartModalReducer,
    cart: cartReducer,
    optionsModal: optionsModalReducer,
    searchModal: searchModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
});
