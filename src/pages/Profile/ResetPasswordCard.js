import React from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input, Card, Alert } from "antd";
import { CheckOutlined, EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

import { antdSuccess, antdError } from "../../utils/antdMessage";
import { getToken, removeToken } from "../../utils";
import axiosInstance from "../../api";
import "./index.css";

const ResetPasswordCard = () => {
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
          antdSuccess("Password successfully reset!");

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

      {/* <Divider /> */}
      <Alert
        message="Note"
        description="        Note: After changing your password, you will be logged out and need to log in
        again with the new password."
        type="info"
        showIcon
        style={{ margin: "1rem auto" }}
      />
      {/* <p style={{ color: "red" }}>

      </p> */}
    </Card>
  );
};

export default ResetPasswordCard;
