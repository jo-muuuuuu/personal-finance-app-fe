import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Form, Input, Divider, message } from "antd";
import axios from "axios";

import { getToken } from "../../utils";
import { antdSuccess, antdError } from "../../utils/antdMessage";
import "./index.css";

const NewAccountBook = () => {
  const navigate = useNavigate();

  const id = useSelector((state) => state.userInfo.userId);

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onFinish = (values) => {
    values = { ...values, id };
    // console.log("Received values of form: ", formValues);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/account-books`, values, {
        headers: {
          token: getToken(),
        },
      })
      .then((response) => {
        // console.log("Success!", response.data);
        antdSuccess("Success!", 1000);
        navigate("/account-book/overview");
      })
      .catch((error) => {
        // console.error("Error!");
        antdError("Failed to add new account book!");
      });
  };

  return (
    <>
      <h2 className="new-title">Create a new account book</h2>
      <Divider />

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        className="new-form"
        name="new-account-book"
        onFinish={onFinish}
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

export default NewAccountBook;
