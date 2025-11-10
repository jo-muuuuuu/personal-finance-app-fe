import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SavingPlanForm from "../../components/SavingPlanForm";
import { newSavingPlan } from "../../store/reducers/savingPlanThunk";
import dayjs from "dayjs";

const NewSavingPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);

  const onCancel = () => {
    navigate("/saving-plan/overview");
  };

  const onFinish = (values) => {
    values = {
      ...values,
      start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
      end_date: dayjs(values.end_date).format("YYYY-MM-DD"),
      userId,
    };
    // console.log("Received values of form: ", values);

    dispatch(newSavingPlan(values));
    navigate("/saving-plan/overview");
  };

  return (
    <SavingPlanForm title="New Saving Plan" onCancel={onCancel} onFinish={onFinish} />
  );
};

export default NewSavingPlan;
