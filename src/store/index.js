import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistedUserInfoReducer from "./reducers/userInfoSlice";
import persistedAccountBookReducer from "./reducers/accountBookSlice";
import persistedTransactionReducer from "./reducers/transactionSlice";

export const store = configureStore({
  reducer: {
    userInfo: persistedUserInfoReducer,
    accountBook: persistedAccountBookReducer,
    transaction: persistedTransactionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
