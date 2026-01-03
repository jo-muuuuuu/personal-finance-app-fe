import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";

import NewSavingsPlanForm from "../../components/SavingsPlanForm/NewSavingsPlanForm";
import { newSavingsPlan } from "../../store/reducers/savingsPlanThunk";
import dayjs from "dayjs";

const NewSavingsPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCancel = () => {
    navigate("/savings-plan/overview");
  };

  const onFinish = (values) => {
    values = {
      ...values,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
    };
    // console.log("Received values of form: ", values);

    dispatch(newSavingsPlan(values));
    navigate("/savings-plan/overview");
  };

  return (
    <NewSavingsPlanForm
      title={
        <p style={{ color: "#1677ff", margin: "0" }}>
          <PlusCircleOutlined /> New Savings Plan
        </p>
      }
      onCancel={onCancel}
      onFinish={onFinish}
    />
  );
};

export default NewSavingsPlan;
