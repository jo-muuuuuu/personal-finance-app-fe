import axiosInstance from "../../api/index";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setTransactionList } from "./transactionSlice";

export const fetchTransactions = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/transactions`);

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

export const fetchTransactionsCount = () => async () => {
  try {
    const response = await axiosInstance.get("/transactions", {
      params: { count: true },
    });

    if (response.status === 200) {
      return response.data.count;
    }
  } catch (error) {
    antdError("Failed to fetch transactions count. Please try again later.");
    console.error("Error fetching transactions count:", error);
  }
};

export const newTransaction = (values) => async () => {
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

export const editTransaction = (values, transactionId) => async () => {
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

export const deleteTransaction = (transactionId) => async (dispatch) => {
  try {
    const response = await axiosInstance.delete(`/transactions/${transactionId}`);

    if (response.status === 200) {
      // console.log("Success!", response.data);
      antdSuccess(`Transaction deleted successfully!`);

      dispatch(fetchTransactions());
    }
  } catch (error) {
    console.error("Error!", error);
    antdError("Failed to delete transaction!");
  }
};
