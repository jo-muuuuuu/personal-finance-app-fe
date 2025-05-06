import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const accountBookSlice = createSlice({
  name: "accountBook",
  initialState: {
    accountBookList: [],
    accountBookSelected: null,
    transactionSelected: null,
  },
  reducers: {
    setAccountBookList: (state, action) => {
      // console.log("action.payload", action.payload);
      state.accountBookList = action.payload;
    },

    setAccountBookSelected: (state, action) => {
      // console.log("action.payload", action.payload);
      state.accountBookSelected = action.payload;
    },

    setTransactionSelected: (state, action) => {
      // console.log("action.payload", action.payload);
      state.transactionSelected = action.payload;
    },
  },
});

const persistConfig = {
  key: "accountBook",
  storage,
};

const persistedAccountBookReducer = persistReducer(
  persistConfig,
  accountBookSlice.reducer
);

export const { setAccountBookList, setAccountBookSelected, setTransactionSelected } =
  accountBookSlice.actions;

export default persistedAccountBookReducer;
