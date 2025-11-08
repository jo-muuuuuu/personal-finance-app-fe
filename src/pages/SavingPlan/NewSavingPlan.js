import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SavingPlanForm from "../../components/SavingPlanForm";
import { newSavingPlan } from "../../store/reducers/savingPlanThunk";

const NewSavingPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);

  const onCancel = () => {
    navigate("/saving-plan/overview");
  };

  const onFinish = (values) => {
    values = { ...values, userId };
    console.log("Received values of form: ", values);

    dispatch(newSavingPlan(values));
    navigate("/saving-plan/overview");
  };

  return (
    <SavingPlanForm title="New Saving Plan" onCancel={onCancel} onFinish={onFinish} />
  );
};

export default NewSavingPlan;
