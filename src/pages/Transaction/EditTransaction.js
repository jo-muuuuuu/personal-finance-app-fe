import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import dayjs from "dayjs";

import TransactionForm from "../../components/TransactionForm";
import {
  deleteTransaction,
  editTransaction,
} from "../../store/reducers/transactionThunk";
import { setTransactionSelected } from "../../store/reducers/transactionSlice";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";

const EditTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transactionSelected = useSelector(
    (state) => state.transaction.transactionSelected
  );

  // console.log("accountBookSelected", accountBookSelected);

  const onCancel = () => {
    navigate("/transactions/overview");
  };

  const onFinish = (values) => {
    values = { ...values, date: dayjs(values.date).format("YYYY-MM-DD") };
    // console.log("Received values of form: ", values);

    dispatch(editTransaction(values, transactionSelected.id));
    navigate("/transactions/overview");
  };

  const onDelete = () => {
    dispatch(deleteTransaction(transactionSelected.id));

    navigate("/transactions/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setTransactionSelected(null));
      dispatch(setAccountBookSelected(null));
    };
  }, [dispatch]);

  return (
    <TransactionForm
      title={`Editing Transaction - [ID: ${transactionSelected.id}]`}
      onFinish={onFinish}
      onCancel={onCancel}
      onDelete={onDelete}
      initialValues={{
        ...transactionSelected,
        select: {
          key: transactionSelected.account_book_id,
          value: transactionSelected.account_book_name,
          label: transactionSelected.account_book_name,
        },
        date: dayjs(transactionSelected.date),
      }}
    />
  );
};

export default EditTransaction;
