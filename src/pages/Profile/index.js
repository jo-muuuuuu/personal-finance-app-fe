import React from "react";

import { Row, Col } from "antd";

import ResetPasswordCard from "./resetPasswordCard";
import UserInfoCard from "./userInfoCard";
import "./index.css";

const Profile = () => {
  return (
    <div>
      <Row>
        <Col span={12} style={{ paddingRight: "1rem" }}>
          <UserInfoCard />
        </Col>
        <Col span={12} style={{ paddingLeft: "1rem" }}>
          <ResetPasswordCard />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
