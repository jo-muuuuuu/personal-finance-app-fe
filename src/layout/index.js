import React from "react";
import { Outlet } from "react-router";
import { Layout, Menu, theme } from "antd";

import CustomSider from "../components/CustomSider";
import CustomHeader from "../components/CustomHeader";

const { Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CustomSider />

      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <CustomHeader />

        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: "center" }}>
          Personal Finance App ©{new Date().getFullYear()} | Created by Zicheng Mu
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
