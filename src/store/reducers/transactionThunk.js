import axios from "axios";
import { getToken } from "../../utils";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setTransactionList } from "./transactionSlice";

export const fetchTransactions = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/transactions`,
      {
        headers: {
          id: userId,
          token: getToken(),
        },
      }
    );

    if (response.status === 200) {
      //   console.log("Success!", response.data.transactionList);

      dispatch(setTransactionList(response.data.transactionList));
      // antdSuccess("Success!");
    }
  } catch (error) {
    antdError("Failed to fetch transactions!");
    console.error("Error fetching transactions", error);
  }
};

export const newTransaction = (values) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/transactions`,
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
    }
  } catch (error) {
    antdError("Failed to add new transaction!");
    console.error("Error adding transactions", error);
  }
};

export const editTransaction = (values, transactionId) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/transactions/${transactionId}`,
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
    }
  } catch (error) {
    antdError("Failed to edit transaction!");
    console.error("Error editing transaction:", error);
  }
};

export const deleteTransaction = (transactionId, userId) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/transactions/${transactionId}`,
      {
        headers: {
          token: getToken(),
        },
      }
    );

    if (response.status === 200) {
      // console.log("Success!", response.data);
      antdSuccess(`Transaction deleted successfully!`);

      dispatch(fetchTransactions(userId));
    }
  } catch (error) {
    console.error("Error!", error);
    antdError("Failed to delete transaction!");
  }
};
