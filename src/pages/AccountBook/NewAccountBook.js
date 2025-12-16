import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AccountBookForm from "../../components/AccountBookForm";
import { newAccountBook } from "../../store/reducers/accountBookThunk";

const NewAccountBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userId = useSelector((state) => state.userInfo.userId);

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onFinish = (values) => {
    values = { ...values };
    dispatch(newAccountBook(values));
    navigate("/account-book/overview");
  };

  return (
    <AccountBookForm
      title="Create a new account book"
      onFinish={onFinish}
      onCancel={onCancel}
    />
  );
};

export default NewAccountBook;
