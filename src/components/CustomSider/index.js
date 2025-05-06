import React from "react";
import { useNavigate, useLocation } from "react-router";
import {
  DashboardOutlined,
  AccountBookOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import { AppLogo } from "../../assets";
import "./index.css";

const { Sider } = Layout;

const siderItems = [
  {
    key: "/",
    icon: React.createElement(DashboardOutlined),
    label: "Dashboard",
  },
  {
    key: "/account-book/overview",
    icon: React.createElement(AccountBookOutlined),
    label: "Account Books",
  },
  {
    key: "/transactions/overview",
    icon: React.createElement(TransactionOutlined),
    label: "Transactions",
  },
  // {
  //   key: "/saving",
  //   icon: <PigSaving style={{ width: "1em", hight: "1em" }} />,
  //   label: "Saving Plans",
  // },
  // {
  //   key: "/profile",
  //   icon: React.createElement(UserOutlined),
  //   label: "Profile",
  // },
];

const CustomSider = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/account-book")) {
      return "/account-book/overview";
    }
    if (currentPath.startsWith("/transactions")) {
      return "/transactions/overview";
    }

    return "/";
  };

  const handleMenuClick = (route) => {
    navigate(route.key);
  };

  return (
    <Sider breakpoint="lg">
      <div className="demo-logo-vertical">
        <AppLogo className="sider-logo" />
        <div className="sider-title">Personal Finance App</div>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/"]}
        selectedKeys={[getSelectedKey()]}
        items={siderItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default CustomSider;
