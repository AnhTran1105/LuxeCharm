import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  type: "info",
  showToast: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.showToast = true;
    },
    dismissMessage: (state) => {
      state.message = "";
      state.type = "info";
      state.showToast = false;
    },
  },
});
export const { sendMessage, dismissMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
