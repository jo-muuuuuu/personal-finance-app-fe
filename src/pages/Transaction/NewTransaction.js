import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import dayjs from "dayjs";
import { PlusCircleOutlined } from "@ant-design/icons";
import TransactionForm from "../../components/TransactionForm";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";
import { newTransaction } from "../../store/reducers/transactionThunk";

const NewTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    values = { ...values, date: dayjs(values.date).format("YYYY-MM-DD") };
    // console.log("Form values:", values);

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
      title={
        <p style={{ color: "#1677ff", margin: "0" }}>
          <PlusCircleOutlined /> New Transaction
        </p>
      }
      onFinish={onFinish}
      onCancel={onCancel}
      divider={true}
    />
  );
};

export default NewTransaction;
