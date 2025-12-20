import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Button, Checkbox, Form, Input, Flex } from "antd";

import axiosInstance from "../../api";

import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/reducers/userInfoSlice";

import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setToken } from "../../utils/index";
import PennyWaveFontBlue from "../../assets/imgs/penny-wave-font-blue.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forgotPasswordNavigate = () => {
    navigate("/forgot-password");
  };

  const registerNavigate = () => {
    navigate("/register");
  };

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);

    axiosInstance
      .post(`/login`, values)
      .then((response) => {
        if (response.status === 200) {
          // console.log("Success!", response.data);

          const { userId, nickname, email, avatarURL, token } = response.data;

          setToken(token, 60);
          dispatch(setUserInfo({ userId, nickname, email, avatarURL }));

          antdSuccess("Login successful!");
          navigate("/");
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
          <img
            src={PennyWaveFontBlue}
            style={{ marginBottom: "1.5rem", height: "4rem" }}
          />
        </div>

        <Form
          className="login-form"
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your E-mail!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="E-mail" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a onClick={forgotPasswordNavigate}>Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a onClick={registerNavigate}>Register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
