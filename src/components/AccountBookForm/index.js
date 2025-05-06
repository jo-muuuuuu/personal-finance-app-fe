import React from "react";

import { Button, Form, Input, Divider } from "antd";
import "./index.css";

const AccountBookForm = ({ title, onFinish, onCancel, initialValues = {} }) => {
  return (
    <>
      <h2 className="new-title">{title}</h2>
      <Divider />

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        className="new-form"
        name="account-book-form"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please the name of your new account book!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Tag" name="tag">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          style={{ textAlign: "center" }}
        >
          <Button className="cancel-button" type="primary" danger onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AccountBookForm;
