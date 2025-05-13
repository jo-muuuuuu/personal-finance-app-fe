import React from "react";

import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteButton = ({ type, name, onDelete }) => {
  return (
    <Popconfirm
      placement="bottom"
      title={`Delete the ${type}`}
      description={
        type === "Account Book" ? (
          <p>
            Are you sure to delete Account Book: [{name}]?
            <br />
            All transactions in this account book will also be deleted.
          </p>
        ) : (
          `Are you sure to delete this Transaction?`
        )
      }
      okText="Yes"
      cancelText="No"
      onConfirm={onDelete}
    >
      <Button danger type="primary">
        <DeleteOutlined />
        Delete
      </Button>
    </Popconfirm>
  );
};

export default DeleteButton;
