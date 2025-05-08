import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactionList: [],
    transactionSelected: null,
  },
  reducers: {
    setTransactionList: (state, action) => {
      // console.log("action.payload", action.payload);
      state.transactionList = action.payload;
    },
    setTransactionSelected: (state, action) => {
      // console.log("action.payload", action.payload);
      state.transactionSelected = action.payload;
    },
  },
});

const persistConfig = {
  key: "transaction",
  storage,
};

const persistedTransactionReducer = persistReducer(
  persistConfig,
  transactionSlice.reducer
);

export const { setTransactionList, setTransactionSelected } = transactionSlice.actions;

export default persistedTransactionReducer;
