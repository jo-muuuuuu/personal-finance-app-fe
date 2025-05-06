import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import { getToken } from "../../utils";
import { antdSuccess, antdError } from "../../utils/antdMessage";

import TransactionForm from "../../components/TransactionForm";

const NewTransaction = () => {
  const navigate = useNavigate();

  const id = useSelector((state) => state.userInfo.userId);

  const onFinish = (values) => {
    // console.log("Form values:", values);
    values = { ...values, id };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/transactions`, values, {
        headers: {
          token: getToken(),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log("Success!", response.data);
          antdSuccess("Success!");
          navigate("/transactions/overview");
        }
      })
      .catch((error) => {
        // console.error("Error!", error);
        antdError("Failed to add new transaction!");
      });
  };

  const onCancel = () => {
    navigate("/transactions/overview");
  };

  return (
    <TransactionForm
      title="Create a New Transaction"
      onFinish={onFinish}
      onCancel={onCancel}
    />
  );
};

export default NewTransaction;
