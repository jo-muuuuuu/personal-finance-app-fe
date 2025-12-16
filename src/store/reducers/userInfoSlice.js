import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  userId: null,
  userEmail: null,
  userNickname: null,
  userAvatarURL: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      // console.log("action.payload", action.payload);
      state.userId = action.payload.userId;
      state.userEmail = action.payload.email;
      state.userNickname = action.payload.nickname;
      state.userAvatarURL = action.payload.avatarURL;
    },
    updateUserAvatar: (state, action) => {
      state.userAvatarURL = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("LOGOUT", () => initialState);
  },
});

const persistConfig = {
  key: "userInfo",
  storage,
};

const persistedUserInfoReducer = persistReducer(persistConfig, userInfoSlice.reducer);

export const { setUserInfo, updateUserAvatar } = userInfoSlice.actions;

export default persistedUserInfoReducer;
