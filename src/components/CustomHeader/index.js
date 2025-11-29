import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Dropdown, Breadcrumb, Avatar, theme } from "antd";
import { LogoutOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../../store";

import "./index.css";
import { removeToken } from "../../utils";

const { Header } = Layout;

const CustomHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const nickname = useSelector((state) => state.userInfo.userNickname);
  const avatarURL = useSelector((state) => state.userInfo.userAvatarURL);

  const defaultAvatar = require("../../assets/imgs/kira.jpeg");
  const avatarSrc = avatarURL
    ? `${process.env.REACT_APP_API_URL}${avatarURL}`
    : defaultAvatar;

  const breadcrumbNameMap = {
    "/dashboard": "Dashboard",
    "/account-book": "Account Books",
    "/account-book/overview": "Overview",
    "/account-book/view": "View a Account Book",
    "/account-book/edit": "Edit a Account Book",
    "/account-book/new": " New Account Book",
    "/transactions": "Transactions",
    "/transactions/overview": "Overview",
    "/transactions/new": "Add a new Transaction",
    "/transactions/view": "View a transaction",
    "/transactions/edit": "Edit a transaction",
    "/savings-plan": "Savings Plans",
    "/savings-plan/overview": "Overview",
    "/savings-plan/new": "New Savings Plan",
    "/savings-plan/view": "View a Savings Plan",
    "/savings-plan/edit": "Edit a Savings Plan",
    "/savings-plan/deposit": "Deposit to a Savings Plan",
    "/profile": "Profile",
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
    removeToken();
    navigate("/login");

    dispatch({ type: "LOGOUT" });
    persistor.purge();
  };

  const headerItems = [
    {
      label: (
        <p>
          <UserOutlined /> Profile
        </p>
      ),
      key: "/profile",
    },
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

      <div style={{ display: "flex", alignItems: "center", float: "right" }}>
        <Avatar src={avatarSrc} style={{ marginRight: "1rem" }} />

        <Dropdown menu={{ items: headerItems }} trigger={["click"]}>
          <span className="nickname">
            {/* {nickname} &nbsp; */}
            {nickname ? nickname.toUpperCase() : ""} &nbsp;
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </Header>
  );
};

export default CustomHeader;
