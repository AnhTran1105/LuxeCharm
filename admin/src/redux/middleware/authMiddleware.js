import { jwtDecode } from "jwt-decode";
import { logout } from "../auth/authSlice";

export const authMiddleware = (store) => (next) => (action) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      store.dispatch(logout());
    }
  }

  return next(action);
};
