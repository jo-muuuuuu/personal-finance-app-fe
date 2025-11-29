import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistedUserInfoReducer from "./reducers/userInfoSlice";
import persistedAccountBookReducer from "./reducers/accountBookSlice";
import persistedTransactionReducer from "./reducers/transactionSlice";
import persistedSavingsPlanReducer from "./reducers/savingsPlanSlice";
import persustedDepositReducer from "./reducers/depositSlicer";

export const store = configureStore({
  reducer: {
    userInfo: persistedUserInfoReducer,
    accountBook: persistedAccountBookReducer,
    transaction: persistedTransactionReducer,
    savingsPlan: persistedSavingsPlanReducer,
    deposit: persustedDepositReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
