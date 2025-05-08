import axios from "axios";
import { getToken } from "../../utils";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setAccountBookList } from "./accountBookSlice";

export const fetchAccountBooks = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/account-books`,
      {
        headers: {
          id: userId,
          token: getToken(),
        },
      }
    );

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
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/account-books`,
      values,
      {
        headers: {
          token: getToken(),
        },
      }
    );

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
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/account-books/${accountBookId}`,
      values,
      {
        headers: {
          token: getToken(),
        },
      }
    );

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
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/account-books/${accountBookId}`,
        {
          headers: {
            token: getToken(),
          },
        }
      );

      if (response.status === 200) {
        antdSuccess(`Successfully deleted "${accountBookName}"!`);

        dispatch(fetchAccountBooks(userId));
      }
    } catch (error) {
      antdError("Failed to delete account book. Please try again later.");
      console.error("Error deleting account book:", error);
    }
  };
