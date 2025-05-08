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
    setUserInfo: (state, action) => {
      // console.log("action.payload", action.payload);
      state.userId = action.payload.id;
      state.userEmail = action.payload.email;
      state.userNickname = action.payload.nickname;
    },
    // setUserNickname: (state, action) => {
    //   state.userNickname = action.payload;
    // },
  },
});

const persistConfig = {
  key: "userInfo",
  storage,
};

const persistedUserInfoReducer = persistReducer(persistConfig, userInfoSlice.reducer);

export const { setUserInfo } = userInfoSlice.actions;

export default persistedUserInfoReducer;
