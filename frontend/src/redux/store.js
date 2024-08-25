import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification/notificationSlice";
import loadingReducer from "./loading/loadingSlice";
import authReducer from "./auth/authSlice";
import modalReducer from "./modal/modalSlice";
import cartReducer from "./cart/cartSlice";
import { authMiddleware } from "./middleware/authMiddleware";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    loading: loadingReducer,
    auth: authReducer,
    modal: modalReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
});
