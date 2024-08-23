import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import notificationReducer from "./notification/notificationSlice";
import loadingReducer from "./loading/loadingSlice";
import modalReducer from "./modal/modalSlice";
import authReducer from "./auth/authSlice";
import { authMiddleware } from "./middleware/authMiddleware";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    loading: loadingReducer,
    modal: modalReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(authMiddleware),
});
