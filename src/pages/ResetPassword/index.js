import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, Button, Form, Input } from "antd";

import { useDispatch } from "react-redux";
import {
  userResetPassword,
  userValidateResetToken,
} from "../../store/reducers/userInfoThunk";

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
  const dispatch = useDispatch();

  const [validToken, setValidToken] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    const res = dispatch(userValidateResetToken(token));
    setValidToken(res);
  }, [dispatch, token]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    dispatch(userResetPassword(token, values, navigate));
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
