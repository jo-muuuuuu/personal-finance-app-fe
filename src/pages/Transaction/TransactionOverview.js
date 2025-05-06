import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Divider, Space, Table } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const TransactionOverview = () => {
  const navigate = useNavigate();

  const newTransactionNav = () => {
    navigate("/transactions/new");
  };

  return (
    <div>
      <div className="header">
        <h2>Latest Transactions</h2>
        <Button className="green-button" type="primary" onClick={newTransactionNav}>
          <PlusCircleOutlined /> New Transaction
        </Button>
      </div>
      <Divider />
    </div>
  );
};

export default TransactionOverview;
