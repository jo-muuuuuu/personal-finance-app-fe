import React from "react";
import { useNavigate, useLocation } from "react-router";
import {
  DashboardOutlined,
  AccountBookOutlined,
  TransactionOutlined,
  MoneyCollectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";

import PennyWaveFontWhite from "../../assets/imgs/penny-wave-font-white.png";
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
  {
    key: "/savings-plan/overview",
    icon: React.createElement(MoneyCollectOutlined),
    label: "Savings Plans",
  },
  {
    key: "/profile",
    icon: React.createElement(UserOutlined),
    label: "Profile",
  },
];

const CustomSider = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/account-book")) {
      return "/account-book/overview";
    } else if (currentPath.startsWith("/transactions")) {
      return "/transactions/overview";
    } else if (currentPath.startsWith("/savings-plan")) {
      return "/savings-plan/overview";
    } else if (currentPath === "/profile") {
      return "/profile";
    }

    return "/";
  };

  const handleMenuClick = (route) => {
    navigate(route.key);
  };

  return (
    <Sider breakpoint="lg">
      <div className="demo-logo-vertical">
        {/* <img src={PennyWaveLogo} className="sider-logo" /> */}
        <img src={PennyWaveFontWhite} className="sider-font" />
        {/* <div className="sider-title">Penny Wave</div> */}
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
