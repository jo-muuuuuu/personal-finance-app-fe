import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  savingsPlanList: [],
  savingsPlanSelected: null,
};

const savingsPlanSlice = createSlice({
  name: "savingsPlan",
  initialState,
  reducers: {
    setSavingsPlanList: (state, action) => {
      // console.log("action.payload", action.payload);
      state.savingsPlanList = action.payload;
    },

    setSavingsPlanSelected: (state, action) => {
      // console.log("action.payload", action.payload);
      state.savingsPlanSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("LOGOUT", () => initialState);
  },
});

const persistConfig = {
  key: "savingsPlan",
  storage,
};

const persistedSavingsPlanReducer = persistReducer(
  persistConfig,
  savingsPlanSlice.reducer
);

export const { setSavingsPlanList, setSavingsPlanSelected } = savingsPlanSlice.actions;

export default persistedSavingsPlanReducer;
