import React from "react";
import { Outlet } from "react-router";
import { Layout, theme } from "antd";

import CustomSider from "../components/CustomSider";
import CustomHeader from "../components/CustomHeader";
import AuthRoute from "../components/AuthRoute/index";

const { Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AuthRoute>
      <Layout style={{ minHeight: "100vh" }}>
        <CustomSider />

        <Layout>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <CustomHeader />

          <Content style={{ margin: "24px 16px 0", height: "100%" }}>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>

          <Footer style={{ textAlign: "center" }}>
            Johnny's Bookkeeping App ©{new Date().getFullYear()} | Created by Zicheng Mu
          </Footer>
        </Layout>
      </Layout>
    </AuthRoute>
  );
};
export default App;
