import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, Button, Form, Input } from "antd";

import axiosInstance from "../../api";

import { antdSuccess, antdError } from "../../utils/antdMessage";

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

const ResetPassword = () => {
  const navigate = useNavigate();

  const [validToken, setValidToken] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axiosInstance.get(`/validate-token`, {
          params: { token },
        });

        setValidToken(true);
      } catch (error) {
        console.error("Error validating token:", error);

        if (error.response && error.response.status === 500) {
          antdError("Server error, please try again later");
        } else {
          antdError("An error occurred: " + error.message);
        }
      }
    };

    validateToken();
  }, [token]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);

    axiosInstance
      .post(`/reset-password`, {
        newPassword: values.password,
      })
      .then((response) => {
        if (response.status === 200) {
          antdSuccess("Password reset successful!");

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

  return validToken ? (
    <div className="login-container">
      <Card title="Reset Password" variant="borderless" style={{ width: 600 }}>
        <Form
          {...formItemLayout}
          form={form}
          name="reset"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
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

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  ) : (
    <div className="login-container">
      <Card title="Invalid Token" variant="borderless" style={{ width: 600 }}>
        <p>The password reset token is invalid or has expired.</p>
      </Card>
    </div>
  );
};

export default ResetPassword;
