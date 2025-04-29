import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";

import persistedUserInfoReducer from "./reducers/userInfo";

export const store = configureStore({
  reducer: {
    userInfo: persistedUserInfoReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
      },
    }),
});

export const persistor = persistStore(store);
