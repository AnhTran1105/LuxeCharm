import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notification/notificationSlice";
import loadingReducer from "./loading/loadingSlice";
import authReducer from "./auth/authSlice";
import modalReducer from "./modal/modalSlice";
import cartModalReducer from "./cartModal/cartModalSlice";
import { authMiddleware } from "./middleware/authMiddleware";

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    loading: loadingReducer,
    auth: authReducer,
    modal: modalReducer,
    cartModal: cartModalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
});
