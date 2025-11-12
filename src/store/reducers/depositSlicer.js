import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  depositList: [],
};

const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {
    setDepositList: (state, action) => {
      // console.log("action.payload", action.payload);
      state.depositList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("LOGOUT", () => initialState);
  },
});

const persistConfig = {
  key: "deposit",
  storage,
};

const persistedDepositReducer = persistReducer(persistConfig, depositSlice.reducer);

export const { setDepositList } = depositSlice.actions;

export default persistedDepositReducer;
