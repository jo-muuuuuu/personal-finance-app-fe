import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import dayjs from "dayjs";

import { getToken } from "../../utils";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import TransactionForm from "../../components/TransactionForm";

const EditTransaction = () => {
  const navigate = useNavigate();

  const id = useSelector((state) => state.userInfo.userId);
  const transactionSelected = useSelector(
    (state) => state.accountBook.transactionSelected
  );

  // console.log("accountBookSelected", accountBookSelected);

  const onCancel = () => {
    navigate("/transactions/overview");
  };

  const onFinish = (values) => {
    // values = { ...values, userId: id, accountBookId: accountBookSelected.id };
    values = { ...values, userId: id };
    // console.log("Received values of form: ", values);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/transactions/${transactionSelected.id}`,
        values,
        {
          headers: {
            token: getToken(),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // console.log("Success!", response.data);
          antdSuccess("Success!");
          navigate("/transactions/overview");
        }
      })
      .catch((error) => {
        // console.error("Error!");
        antdError("Failed to edit transaction!");
      });
  };

  return (
    <TransactionForm
      title={`Editing Transaction - [ID: ${transactionSelected.id}]`}
      onFinish={onFinish}
      onCancel={onCancel}
      initialValues={{
        ...transactionSelected,
        select: {
          value: transactionSelected.account_book_id,
          label: transactionSelected.account_book_name,
        },
        date: dayjs(transactionSelected.date),
      }}
    />
  );
};

export default EditTransaction;
