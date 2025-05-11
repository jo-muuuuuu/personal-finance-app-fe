import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import TransactionForm from "../../components/TransactionForm";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";
import { newTransaction } from "../../store/reducers/transactionThunk";

const NewTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);

  const onFinish = (values) => {
    // console.log("Form values:", values);
    values = { ...values, userId };

    dispatch(newTransaction(values));
    navigate("/transactions/overview");
  };

  const onCancel = () => {
    navigate("/transactions/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setAccountBookSelected(null));
    };
  }, [dispatch]);

  return (
    <TransactionForm
      title="Create a New Transaction"
      onFinish={onFinish}
      onCancel={onCancel}
    />
  );
};

export default NewTransaction;
