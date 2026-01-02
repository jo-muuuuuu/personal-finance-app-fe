import React from "react";
import { Button, Dropdown } from "antd";
import { PlusCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import "./index.css";
import { useNavigate } from "react-router";

const EmptyState = ({
  nickname,
  img,
  smallImg,
  alt,
  title,
  description,
  nav,
  btnText,
  dropdown,
}) => {
  const navigate = useNavigate();

  const dropdownItems = [
    {
      key: "1",
      label: (
        <p
          className="dashboard-dropdown-item"
          onClick={() => {
            navigate("/account-book/new");
          }}
        >
          <PlusCircleOutlined /> New Account Book
        </p>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <p
    //       className="dashboard-dropdown-item"
    //       onClick={() => {
    //         navigate("/transactions/new");
    //       }}
    //     >
    //       <PlusCircleOutlined /> New Transaction
    //     </p>
    //   ),
    // },
    {
      key: "2",
      label: (
        <p
          className="dashboard-dropdown-item"
          onClick={() => {
            navigate("/savings-plan/new");
          }}
        >
          <PlusCircleOutlined /> New Savings Plan
        </p>
      ),
    },
  ];

  return (
    <div className="empty-state">
      {nickname && <h2>👋 Welcome to Pennywave, {nickname.toUpperCase()}!</h2>}

      <img
        src={img}
        alt={alt}
        className="empty-state-img"
        width={smallImg ? "180px !important" : "280px"}
      />

      <h3 className="empty-state-title">{title}</h3>

      <p className="empty-state-desc">{description}</p>

      {dropdown ? (
        <Dropdown
          menu={{ items: dropdownItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button type="primary">
            Quick Actions <DownCircleOutlined />
          </Button>
        </Dropdown>
      ) : (
        <Button type="primary" onClick={nav}>
          <PlusCircleOutlined />
          {btnText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
