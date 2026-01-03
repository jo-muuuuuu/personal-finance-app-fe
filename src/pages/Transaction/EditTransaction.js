import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";
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
      title={
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#1677ff", marginTop: "0" }}>
            <EditOutlined /> Editing Transaction
          </p>
          <Divider>ID - {transactionSelected.id}</Divider>
        </div>
      }
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
