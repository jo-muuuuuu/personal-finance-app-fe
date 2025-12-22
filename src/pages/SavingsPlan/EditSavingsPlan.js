import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Divider, Alert } from "antd";
import { BarsOutlined } from "@ant-design/icons";

import EditSavingsPlanForm from "../../components/SavingsPlanForm/EditSavingsPlanForm";
import { setSavingsPlanSelected } from "../../store/reducers/savingsPlanSlice";
import {
  editSavingsPlan,
  deleteSavingsPlan,
} from "../../store/reducers/savingsPlanThunk";
import DepositList from "../../components/DepositList";
import dayjs from "dayjs";

const EditSavingsPlan = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savingsPlanSelected = useSelector(
    (state) => state.savingsPlan.savingsPlanSelected
  );

  const onCancel = () => {
    navigate("/savings-plan/overview");
  };

  const onDelete = () => {
    dispatch(deleteSavingsPlan(savingsPlanSelected.id, savingsPlanSelected.name));

    navigate("/savings-plan/overview");
  };

  const onFinish = (values) => {
    dispatch(editSavingsPlan(values, savingsPlanSelected.id));
    navigate("/savings-plan/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setSavingsPlanSelected(null));
    };
  }, [dispatch]);

  return (
    <>
      <EditSavingsPlanForm
        title={`Editing Savings Plan: [${savingsPlanSelected.name.toUpperCase()}]`}
        onFinish={onFinish}
        onCancel={onCancel}
        onDelete={onDelete}
        initialValues={{
          ...savingsPlanSelected,
          start_date: dayjs(savingsPlanSelected.start_date),
          end_date: dayjs(savingsPlanSelected.end_date),
          remaining_amount:
            savingsPlanSelected.amount - savingsPlanSelected.deposited_amount,
          remaining_periods:
            savingsPlanSelected.total_periods - savingsPlanSelected.completed_periods,
        }}
      />

      <Divider style={{ color: "#1677ff" }}>
        <BarsOutlined /> Deposit Records
      </Divider>

      <Alert
        message="Note"
        description="The deposit list below is for reference only. Modifying the savings plan will not affect any deposits that have already been completed."
        type="info"
        showIcon
        style={{ maxWidth: 800, margin: "2rem auto" }}
      />

      <DepositList title={false} deposit={false} />
    </>
  );
};

export default EditSavingsPlan;
