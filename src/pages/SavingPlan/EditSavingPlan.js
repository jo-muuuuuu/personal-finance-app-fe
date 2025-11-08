import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SavingPlanForm from "../../components/SavingPlanForm";
import { setSavingPlanSelected } from "../../store/reducers/savingPlanSlice";
import { editSavingPlan, deleteSavingPlan } from "../../store/reducers/savingPlanThunk";
import dayjs from "dayjs";

const EditSavingPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);
  const savingPlanSelected = useSelector((state) => state.savingPlan.savingPlanSelected);

  const onCancel = () => {
    navigate("/saving-plan/overview");
  };

  const onDelete = () => {
    dispatch(deleteSavingPlan(savingPlanSelected.id, savingPlanSelected.name, userId));

    navigate("/saving-plan/overview");
  };

  const onFinish = (values) => {
    values = { ...values, userId };

    dispatch(editSavingPlan(values, savingPlanSelected.id));
    navigate("/saving-plan/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setSavingPlanSelected(null));
    };
  }, [dispatch]);

  return (
    <SavingPlanForm
      title={`Editing Saving Plan: [${savingPlanSelected.name.toUpperCase()}]`}
      onFinish={onFinish}
      onCancel={onCancel}
      onDelete={onDelete}
      initialValues={{
        ...savingPlanSelected,
        start_date: dayjs(savingPlanSelected.start_date),
        end_date: dayjs(savingPlanSelected.end_date),
      }}
    />
  );
};

export default EditSavingPlan;
