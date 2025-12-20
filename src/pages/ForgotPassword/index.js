import React from "react";
import { useNavigate } from "react-router-dom";

import { LeftOutlined } from "@ant-design/icons";
import { Card, Button, Form, Input, Divider } from "antd";

import axiosInstance from "../../api";
import "./index.css";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import PennyWaveFontBlue from "../../assets/imgs/penny-wave-font-blue.png";

const ForgotPassword = () => {
  const naviage = useNavigate();

  const loginNavigate = () => {
    naviage("/login");
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);

    axiosInstance
      .post(`/forgot-password`, values)
      .then((response) => {
        if (response.status === 200) {
          antdSuccess("Please check your email for password reset link!");
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
    <div className="login-container">
      <Card className="login-card" variant="borderless" style={{ width: 500 }}>
        <div style={{ textAlign: "center" }}>
          <img src={PennyWaveFontBlue} style={{ height: "4rem" }} />
        </div>
        <Divider />
        <div style={{ textAlign: "center", color: "#1677ff", marginBottom: "1.5rem" }}>
          <h2>Forgot Password</h2>
        </div>
        {/* <div className="login-link">
          <a onClick={loginNavigate}>
            <LeftOutlined /> Back to Log In
          </a>
        </div> */}
        <div className="reset-hint">
          <p>
            Enter your e-mail address below, and we'll send you an e-mail allowing you to
            reset your password.
          </p>
        </div>

        <Form
          className="login-form"
          name="reset"
          onFinish={onFinish}
          style={{ maxWidth: 360 }}
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
