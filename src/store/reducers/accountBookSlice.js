import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const accountBookSlice = createSlice({
  name: "accountBook",
  initialState: {
    accountBookList: [],
    accountBookSelected: null,
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

export const {
  setAccountBookList,
  setAccountBookSelected,
  fetchAccountBooks,
  deleteAccountBook,
} = accountBookSlice.actions;

export default persistedAccountBookReducer;
