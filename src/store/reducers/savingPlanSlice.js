import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const savingPlanSlice = createSlice({
  name: "savingPlan",
  initialState: {
    savingPlanList: [],
    savingPlanSelected: null,
  },
  reducers: {
    setSavingPlanList: (state, action) => {
      // console.log("action.payload", action.payload);
      state.savingPlanList = action.payload;
    },

    setSavingPlanSelected: (state, action) => {
      // console.log("action.payload", action.payload);
      state.savingPlanSelected = action.payload;
    },
  },
});

const persistConfig = {
  key: "savingPlan",
  storage,
};

const persistedSavingPlanReducer = persistReducer(persistConfig, savingPlanSlice.reducer);

export const { setSavingPlanList, setSavingPlanSelected } = savingPlanSlice.actions;

export default persistedSavingPlanReducer;
