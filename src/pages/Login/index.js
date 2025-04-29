import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Button, Checkbox, Form, Input, Flex, message } from "antd";

import axios from "axios";

import { useDispatch } from "react-redux";
import { setUserNickname } from "../../store/reducers/userInfo";

import { antdSuccess, antdError } from "../../utils/antdMessage";
import { setToken } from "../../utils/index";

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
    console.log("Received values of form: ", values);

    axios
      .post("http://localhost:6789/api/login", values)
      .then((response) => {
        // console.log("Success!", response.data);

        const { id, nickname, email, token } = response.data;
        // setId(id);
        // setNickname(nickname);
        // setEmail(email);
        setToken(token, 60);
        dispatch(setUserNickname(nickname));

        antdSuccess("Login successful!");
        navigate("/");
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
      <Card
        className="login-card"
        title="Personal Finance App"
        variant="borderless"
        style={{ width: 500 }}
      >
        <Form
          className="login-form"
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
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
