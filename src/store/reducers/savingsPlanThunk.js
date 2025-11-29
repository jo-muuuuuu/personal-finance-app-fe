import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setSavingsPlanList, setSavingsPlanSelected } from "./savingsPlanSlice";

export const fetchSavingsPlans = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/savings-plans`, {
      headers: {
        id: userId,
      },
    });

    if (response.status === 200) {
      // console.log("response.data.savingsPlanList", response.data.savingsPlanList);
      dispatch(setSavingsPlanList(response.data.savingsPlanList));
    }
  } catch (error) {
    antdError("Failed to fetch savings plans. Please try again later.");
    console.error("Error fetching savings plans:", error);
  }
};

// export const fetchSavingsPlanById = (savingsPlanId) => async (dispatch) => {
//   try {
//     const response = await axiosInstance.get(`/savings-plans/${savingsPlanId}`);
//     console.log(response);
//     // dispatch(setSavingsPlanSelected())
//   } catch (error) {
//     antdError("Failed to fetch savings plan. Please try again later.");
//     console.error("Error fetching savings plan:", error);
//   }
// };

export const newSavingsPlan = (values) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/savings-plans`, values);

    if (response.status === 200) {
      antdSuccess("Success!");
    }
  } catch (error) {
    antdError("Failed to add new savings plan!");
    console.error("Error adding savings plan:", error);
  }
};

export const editSavingsPlan = (values, savingsPlanId) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/savings-plans/${savingsPlanId}`, values);

    if (response.status === 200) {
      // console.log("Success!", response.data);
      antdSuccess("Success!");

      // dispatch(setAccountBookSelected(null));
    }
  } catch (error) {
    antdError("Failed to edit savings plan!");
    console.error("Error editing savings plan:", error);
  }
};

export const deleteSavingsPlan =
  (savingsPlanId, savingsPlanName, userId) => async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`/savings-plans/${savingsPlanId}`);

      if (response.status === 200) {
        antdSuccess(`Successfully deleted "${savingsPlanName}"!`);

        dispatch(fetchSavingsPlans(userId));
      }
    } catch (error) {
      antdError("Failed to delete savings plan. Please try again later.");
      console.error("Error deleting savings plan:", error);
    }
  };
