import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LeftOutlined } from "@ant-design/icons";
import { Modal, Card, Button, Checkbox, Form, Input } from "antd";

import { antdSuccess, antdError } from "../../utils/antdMessage";
import axiosInstance from "../../api";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const loginNavigate = () => {
    navigate("/login");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);

    axiosInstance
      .post(`/register`, values)
      .then((response) => {
        if (response.status === 200) {
          // console.log("Success!", response.data);
          antdSuccess("Success!");
          navigate("/login");
        }
      })
      .catch((error) => {
        // console.error("Error!", error);

        if (error.response) {
          if (error.response.status === 409) {
            antdError("Email already exists!");
          } else if (error.response.status === 500) {
            antdError("Server error, please try again later");
          }
        } else {
          antdError("Failed to register!");
        }

        // console.error("Error!");
      });
  };

  return (
    <div className="login-container">
      <Card title="Create A New Account" variant="borderless" style={{ width: 600 }}>
        <div className="login-link" style={{ marginBottom: "1rem" }}>
          <a onClick={loginNavigate}>
            <LeftOutlined /> Back to Log In
          </a>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
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

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a onClick={showModal}>agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title="No Agreement At All 😜"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>This is just to pretend there's an agreement.</p>
      </Modal>
    </div>
  );
};

export default Register;
