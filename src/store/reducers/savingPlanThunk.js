import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setSavingPlanList } from "./savingPlanSlice";

export const fetchSavingPlans = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/saving-plans`, {
      headers: {
        id: userId,
      },
    });

    if (response.status === 200) {
      // console.log("response.data.savingPlanList", response.data.savingPlanList);
      dispatch(setSavingPlanList(response.data.savingPlanList));
    }
  } catch (error) {
    antdError("Failed to fetch saving plans. Please try again later.");
    console.error("Error fetching saving plans:", error);
  }
};

export const newSavingPlan = (values) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/saving-plans`, values);

    if (response.status === 200) {
      antdSuccess("Success!");
    }
  } catch (error) {
    antdError("Failed to add new saving plan!");
    console.error("Error adding saving plan:", error);
  }
};
