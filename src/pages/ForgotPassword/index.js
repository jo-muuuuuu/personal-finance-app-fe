import React from "react";
import { useNavigate } from "react-router-dom";

import { LeftOutlined } from "@ant-design/icons";
import { Card, Button, Form, Input } from "antd";

import "./index.css";

const ForgotPassword = () => {
  const naviage = useNavigate();

  const loginNavigate = () => {
    naviage("/login");
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-container">
      <Card
        className="login-card"
        title="Password Reset"
        variant="borderless"
        style={{ width: 500 }}
      >
        <div className="login-link">
          <a onClick={loginNavigate}>
            <LeftOutlined /> Back to Log In
          </a>
        </div>
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
