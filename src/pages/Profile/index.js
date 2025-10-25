import React from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input, Row, Col, Card, Divider } from "antd";
import { CheckOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import "./index.css";
import axiosInstance from "../../api";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import { getToken, removeToken } from "../../utils";

const Profile = () => {
  const avatar = require("../../assets/imgs/kira.jpeg");

  const email = useSelector((state) => state.userInfo.userEmail);
  const nickname = useSelector((state) => state.userInfo.userNickname);

  const accountBookCount = useSelector(
    (state) => state.accountBook.accountBookList.length
  );
  const transactionCount = useSelector(
    (state) => state.transaction.transactionList.length
  );

  const navigate = useNavigate();

  const onFinish = (values) => {
    axiosInstance
      .post(`/profile-reset-password`, {
        token: getToken(),
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          antdSuccess("Password reset successful!");

          removeToken();
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);

          if (error.response.status === 401) {
            antdError("Invalid email or password");
          } else if (error.response.status === 500) {
            antdError("Server error, please try again later");
          }
        } else {
          antdError("An error occurred: " + error.message);
        }
      });
  };

  return (
    <div>
      <Row>
        <Col span={12} style={{ paddingRight: "1rem" }}>
          <Card className="profile-card" variant="borderless">
            <div className="profile-user-info">
              <img src={avatar} />

              <div className="profile-user-name">
                <p>{nickname}</p>
                {/* <Button type="primary" className="blue-button">
                  Upload Avatar
                </Button> */}
              </div>
            </div>

            <Divider />

            <div className="profile-log-info">
              <p>
                <span className="profile-log-info-title">Email</span>
                <span className="profile-log-info-detail">{email}</span>
              </p>

              <p>
                <span className="profile-log-info-title"># of account books</span>
                <span className="profile-log-info-detail">{accountBookCount}</span>
              </p>

              <p>
                <span className="profile-log-info-title"># of transactions</span>
                <span className="profile-log-info-detail">{transactionCount}</span>
              </p>
            </div>
          </Card>
        </Col>
        <Col span={12} style={{ paddingLeft: "1rem" }}>
          <Card className="profile-card" title="Reset Password" variant="borderless">
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              className="new-form"
              name="reset-password-form"
              onFinish={onFinish}
            >
              <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your old password!",
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input.Password
                  placeholder="input old password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input.Password
                  placeholder="input new password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter the same new password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The new password that you entered do not match!")
                      );
                    },
                  }),
                ]}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input.Password
                  placeholder="confirm new password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 24,
                }}
                style={{ textAlign: "center" }}
              >
                <Button className="green-button" type="primary" htmlType="submit">
                  <CheckOutlined />
                  Confirm
                </Button>
              </Form.Item>
            </Form>

            <Divider />
            <p style={{ color: "red" }}>
              Note: After changing your password, you will be logged out and need to log
              in again with the new password.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
