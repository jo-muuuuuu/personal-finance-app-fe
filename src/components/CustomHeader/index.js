import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Dropdown, Breadcrumb, theme } from "antd";
import { LogoutOutlined, DownOutlined } from "@ant-design/icons";

import "./index.css";

const { Header } = Layout;

const CustomHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbNameMap = {
    "/dashboard": "Dashboard",
    "/account-book": "Account Books",
    // "/account-book/view_account": "View a Account Book",
    // "/account-book/edit_account": "Edit a Account Book",
    // "/account-book/new_account": "Add a New Account Book",
    "/transactions": "Transactions",
    // "/transactions/new_transaction": "Add a new Transaction",
    // "/transactions/view_transaction": "View a transaction",
    // "/transactions/edit_transaction": "Edit a transaction",
  };

  //   console.log("pathname", location.pathname);
  let pathSnippets = location.pathname.split("/").filter((i) => i);

  if (location.pathname === "/") {
    pathSnippets = ["dashboard"];
  }
  //   console.log("pathSnippets", pathSnippets);

  const extraBreadcrumbItems = pathSnippets
    .map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      //   console.log("url", url);

      if (breadcrumbNameMap[url]) {
        // console.log("breadcrumbNameMap[url]", breadcrumbNameMap[url]);
        return {
          key: url,
          title: breadcrumbNameMap[url],
        };
      }

      return null;
    })
    .filter((item) => item !== null);
  //   console.log("extraBreadcrumbItems", extraBreadcrumbItems);

  const breadcrumbItems = [
    {
      key: "/",
      title: "App",
    },
    ...extraBreadcrumbItems,
  ];

  const logOutNavigate = () => {
    // removeId();
    // removeNickname();
    // removeEmail();
    // removeToken();

    navigate("/login");
  };

  const headerItems = [
    // {
    //   label: (
    //     <p>
    //       <UserOutlined /> Profile
    //     </p>
    //   ),
    //   key: "/profile",
    // },
    {
      label: (
        <p onClick={logOutNavigate}>
          <LogoutOutlined /> Log Out
        </p>
      ),
      key: "logout",
    },
  ];

  return (
    <Header
      className="custom-header"
      style={{ padding: "0 2rem", background: colorBgContainer }}
    >
      <Breadcrumb items={breadcrumbItems} />

      <Dropdown menu={{ items: headerItems }} trigger={["click"]}>
        <p className="nickname">
          Jonathan &nbsp;
          {/* {nickname ? nickname.toUpperCase() : ""} &nbsp; */}
          <DownOutlined />
        </p>
      </Dropdown>
    </Header>
  );
};

export default CustomHeader;
