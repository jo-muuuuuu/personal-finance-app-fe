import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  accountBookList: [],
  accountBookSelected: null,
};

const accountBookSlice = createSlice({
  name: "accountBook",
  initialState,
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
  extraReducers: (builder) => {
    builder.addCase("LOGOUT", () => initialState);
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

export const { setAccountBookList, setAccountBookSelected } = accountBookSlice.actions;

export default persistedAccountBookReducer;
