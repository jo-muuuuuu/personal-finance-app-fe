import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userId: null,
    userEmail: null,
    userNickname: null,
  },
  reducers: {
    setUserNickname: (state, action) => {
      state.userNickname = action.payload;
    },
  },
});

const persistConfig = {
  key: "userInfo",
  storage,
};

const persistedUserInfoReducer = persistReducer(persistConfig, userInfoSlice.reducer);

export const { setUserNickname } = userInfoSlice.actions;

export default persistedUserInfoReducer;
