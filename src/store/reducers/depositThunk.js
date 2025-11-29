import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setDepositList } from "./depositSlicer";
import { setSavingsPlanSelected } from "./savingsPlanSlice";
import { fetchSavingsPlans } from "./savingsPlanThunk";

export const fetchDeposits = (planId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/deposits`, {
      headers: {
        id: planId,
      },
    });

    if (response.status === 200) {
      // console.log("response.data.savingsPlanList", response.data.savingsPlanList);
      dispatch(setDepositList(response.data.depositList));
    }
  } catch (error) {
    antdError("Failed to fetch deposit list. Please try again later.");
    console.error("Error fetching deposit list:", error);
  }
};

export const confirmDeposit = (values) => async (dispatch) => {
  try {
    const response = await axiosInstance.put("/deposits/:id", values);
    // console.log(values);

    if (response.status === 200) {
      antdSuccess("Success!");
      await dispatch(fetchDeposits(values.plan_id));
    }

    return response;
  } catch (error) {
    antdError("Failed to confirm deposit!");
    console.error("Error confirming deposit:", error);
    throw error;
  }
};

export const resetDeposit = (values) => async (dispatch) => {
  try {
    const response = await axiosInstance.put("/deposits/reset/:id", values);
    // console.log(values);

    if (response.status === 200) {
      antdSuccess("Deposit has been reset!");
      await dispatch(fetchDeposits(values.plan_id));
    }

    return response;
  } catch (error) {
    antdError("Failed to reset deposit!");
    console.error("Error resetting deposit:", error);
    throw error;
  }
};
