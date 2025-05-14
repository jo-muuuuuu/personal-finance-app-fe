import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setTransactionList } from "./transactionSlice";

export const fetchTransactions = (userId) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/transactions`, {
      headers: {
        id: userId,
      },
    });

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
    const response = await axiosInstance.post(`/transactions`, values);

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
    const response = await axiosInstance.put(`/transactions/${transactionId}`, values);

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
    const response = await axiosInstance.delete(`/transactions/${transactionId}`);

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
