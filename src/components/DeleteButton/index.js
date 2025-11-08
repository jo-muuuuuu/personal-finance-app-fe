import React from "react";
import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteButton = ({ type, name, onDelete }) => {
  const getDescription = () => {
    switch (type) {
      case "Account Book":
        return (
          <p>
            Are you sure to delete Account Book: [{name}]?
            <br />
            All transactions in this account book will also be deleted.
          </p>
        );
      case "Saving Plan":
        return (
          <p>
            Are you sure to delete Saving Plan: [{name}]?
            <br />
            All related savings records and goals will be permanently removed.
          </p>
        );
      default:
        return "Are you sure to delete this Transaction?";
    }
  };

  return (
    <Popconfirm
      placement="bottom"
      title={`Delete the ${type}`}
      description={getDescription()}
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
