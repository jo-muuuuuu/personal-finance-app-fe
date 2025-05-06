import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

import { getToken } from "../../utils";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import AccountBookForm from "../../components/AccountBookForm";

const EditAccountBook = () => {
  const navigate = useNavigate();

  const id = useSelector((state) => state.userInfo.userId);
  const accountBookSelected = useSelector(
    (state) => state.accountBook.accountBookSelected
  );

  // console.log("accountBookSelected", accountBookSelected);

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onFinish = (values) => {
    values = { ...values, userId: id, accountBookId: accountBookSelected.id };
    console.log("Received values of form: ", values);

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/account-books`, values, {
        headers: {
          token: getToken(),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log("Success!", response.data);
          antdSuccess("Success!");
          navigate("/account-book/overview");
        }
      })
      .catch((error) => {
        // console.error("Error!");
        antdError("Failed to edit account book!");
      });
  };

  return (
    <AccountBookForm
      title={`Editing account book: [${accountBookSelected.name.toUpperCase()}]`}
      onFinish={onFinish}
      onCancel={onCancel}
      initialValues={accountBookSelected}
    />
  );
};

export default EditAccountBook;
