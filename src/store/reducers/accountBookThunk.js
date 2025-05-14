import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setAccountBookList } from "./accountBookSlice";

export const fetchAccountBooks = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/account-books`, {
      headers: {
        id: userId,
      },
    });

    if (response.status === 200) {
      dispatch(setAccountBookList(response.data.accountBookList));
    }
  } catch (error) {
    antdError("Failed to fetch account books. Please try again later.");
    console.error("Error fetching account books:", error);
  }
};

export const newAccountBook = (values) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/account-books`, values);

    if (response.status === 200) {
      antdSuccess("Success!");
    }
  } catch (error) {
    antdError("Failed to add new account book!");
    console.error("Error adding account book:", error);
  }
};

export const editAccountBook = (values, accountBookId) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/account-books/${accountBookId}`, values);

    if (response.status === 200) {
      // console.log("Success!", response.data);
      antdSuccess("Success!");

      // dispatch(setAccountBookSelected(null));
    }
  } catch (error) {
    antdError("Failed to edit account book!");
    console.error("Error editing account book:", error);
  }
};

export const deleteAccountBook =
  (accountBookId, accountBookName, userId) => async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`/account-books/${accountBookId}`);

      if (response.status === 200) {
        antdSuccess(`Successfully deleted "${accountBookName}"!`);

        dispatch(fetchAccountBooks(userId));
      }
    } catch (error) {
      antdError("Failed to delete account book. Please try again later.");
      console.error("Error deleting account book:", error);
    }
  };
