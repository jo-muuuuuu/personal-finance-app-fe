import React from "react";

import { Button, Space, Table } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

const { Column } = Table;

const SavingPlanOverview = () => {
  const navigate = useNavigate();

  const newSavingPlanNav = () => {
    // navigate("/saving-plan/new");
  };

  return (
    <div>
      <div className="header">
        <h2>Your Saving Plans</h2>
        <Button type="primary" className="green-button" onClick={newSavingPlanNav}>
          <PlusCircleOutlined /> New Saving Plan
        </Button>
      </div>

      <Table dataSource={[]}>
        <Column title="Saving Plan"></Column>
        <Column title="Period"></Column>
        <Column title="Current Amount"></Column>
        <Column title="Total Amount"></Column>
        <Column title="Progress"></Column>
        <Column title="Action"></Column>
      </Table>
    </div>
  );
};

export default SavingPlanOverview;
