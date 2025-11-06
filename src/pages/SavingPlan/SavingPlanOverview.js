import React, { useEffect } from "react";

import { Button, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavingPlans } from "../../store/reducers/savingPlanThunk";
import dayjs from "dayjs";

const { Column } = Table;

const SavingPlanOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);
  const savingPlanList = useSelector((state) => state.savingPlan.savingPlanList);

  const newSavingPlanNav = () => {
    navigate("/saving-plan/new");
  };

  useEffect(() => {
    dispatch(fetchSavingPlans(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <div className="header">
        <h2>Your Saving Plans</h2>
        <Button type="primary" className="green-button" onClick={newSavingPlanNav}>
          <PlusCircleOutlined /> New Saving Plan
        </Button>
      </div>

      <Table dataSource={savingPlanList}>
        <Column title="Saving Plan" dataIndex="name"></Column>
        <Column title="Total Amount" dataIndex="amount"></Column>
        <Column title="Period" dataIndex="period"></Column>
        {/* <Column title="Current Amount"></Column> */}
        <Column title="Amount per Period" dataIndex="amount_per_period"></Column>
        <Column
          title="Next Deposit Date"
          dataIndex="start_date"
          render={(date) => dayjs(date).format("YYYY-MM-DD") || "N/A"}
        ></Column>
        <Column
          title="Progress"
          render={(_, record) => `${record.completed_periods} / ${record.total_periods}`}
        ></Column>
        <Column title="Status" dataIndex="status"></Column>
        {/* <Column title="Action"></Column> */}
      </Table>
    </div>
  );
};

export default SavingPlanOverview;
