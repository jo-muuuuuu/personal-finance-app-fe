import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setAccountBookList } from "./accountBookSlice";

export const fetchAccountBooks = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get("/account-books");

    if (response.status === 200) {
      dispatch(setAccountBookList(response.data.accountBookList));
    }
  } catch (error) {
    antdError("Failed to fetch account books. Please try again later.");
    console.error("Error fetching account books:", error);
  }
};

export const fetchAccountBooksCount = () => async () => {
  try {
    const response = await axiosInstance.get("/account-books", {
      params: { count: true },
    });

    if (response.status === 200) {
      return response.data.count;
    }
  } catch (error) {
    antdError("Failed to fetch account books count. Please try again later.");
    console.error("Error fetching account books count:", error);
  }
};

export const newAccountBook = (values) => async () => {
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

export const editAccountBook = (values, accountBookId) => async () => {
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

export const deleteAccountBook = (accountBookId, accountBookName) => async (dispatch) => {
  try {
    const response = await axiosInstance.delete(`/account-books/${accountBookId}`);

    if (response.status === 200) {
      antdSuccess(`Successfully deleted "${accountBookName}"!`);

      dispatch(fetchAccountBooks());
    }
  } catch (error) {
    antdError("Failed to delete account book. Please try again later.");
    console.error("Error deleting account book:", error);
  }
};
