import React from "react";

import { Button, Form, Input, Row, Col, Divider } from "antd";
import { CheckOutlined, LeftOutlined } from "@ant-design/icons";

import "./index.css";
import DeleteButton from "../DeleteButton";

const AccountBookForm = ({
  title,
  onFinish,
  onCancel,
  onDelete,
  divider,
  initialValues = {},
}) => {
  // console.log(initialValues);

  return (
    <>
      <Row className="view-transaction-header">
        <Col span={8}>
          <Button type="primary" onClick={onCancel}>
            <LeftOutlined />
            Cancel
          </Button>
        </Col>
        <Col span={8}>
          <h2>{title}</h2>
        </Col>

        <Col span={8}>
          {onDelete && (
            <DeleteButton
              type={"Account Book"}
              name={initialValues.id}
              onDelete={onDelete}
            />
          )}
        </Col>
      </Row>

      {divider && <Divider />}

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
          <Button className="green-button" type="primary" htmlType="submit">
            <CheckOutlined />
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AccountBookForm;
