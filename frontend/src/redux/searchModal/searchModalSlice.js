import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
};

const searchModalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    openSearchModal: (state) => {
      state.isOpened = true;
    },
    closeSearchModal: (state) => {
      state.isOpened = false;
    },
  },
});

export const { openSearchModal, closeSearchModal } = searchModalSlice.actions;
export default searchModalSlice.reducer;
