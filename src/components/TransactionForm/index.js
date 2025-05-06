import React, { useState } from "react";

import { Button, Form, Input, Divider, DatePicker, Radio, Select } from "antd";
// import "./index.css";

import { useSelector } from "react-redux";

import * as Icons from "../../assets";
import CategoryGrid from "../CategoryGrid";

const expenses = [
  { id: 1, name: "Grocery", icon: <Icons.Grocery /> },
  { id: 2, name: "Public Transport", icon: <Icons.PublicTransport /> },
  { id: 3, name: "Health", icon: <Icons.Health /> },
  { id: 4, name: "Taxi", icon: <Icons.Taxi /> },
  { id: 5, name: "Clothing", icon: <Icons.Clothing /> },
  { id: 6, name: "Gift", icon: <Icons.Gift /> },
  { id: 7, name: "Digital Product", icon: <Icons.Digital /> },
  { id: 8, name: "Shopping", icon: <Icons.Shopping /> },
  { id: 9, name: "Dining", icon: <Icons.Dining /> },
  { id: 10, name: "Dessert", icon: <Icons.Dessert /> },
  { id: 11, name: "Bar", icon: <Icons.Bar /> },
  { id: 12, name: "Pet", icon: <Icons.Pet /> },
  { id: 13, name: "Baby Care", icon: <Icons.Babycare /> },
  { id: 14, name: "Gaming", icon: <Icons.Gaming /> },
  { id: 15, name: "Gym", icon: <Icons.Gym /> },
  { id: 16, name: "Subscription", icon: <Icons.Subscription /> },
  { id: 17, name: "Travel", icon: <Icons.Travel /> },
  { id: 18, name: "Transport", icon: <Icons.Transport /> },
  { id: 19, name: "Hotel", icon: <Icons.Hotel /> },
  { id: 20, name: "Ticket", icon: <Icons.Ticket /> },
];

const incomes = [
  { id: 21, name: "Salary", icon: <Icons.Salary /> },
  { id: 22, name: "Bonus", icon: <Icons.Bonus /> },
  { id: 23, name: "Overtime", icon: <Icons.Overtime /> },
  { id: 24, name: "Financial Management Income", icon: <Icons.Financial /> },
];

const TransactionForm = ({
  title,
  onFinish,
  onCancel,
  initialValues = { type: "expense" },
}) => {
  const [type, setType] = useState("");
  const [categorySelected, setCategorySelected] = useState(null);

  const accountBookList = useSelector((state) => state.accountBook.accountBookList);

  // console.log(initialValues);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategorySelect = (name) => {
    // console.log("Selected category name:", name);
    setCategorySelected(name);
  };

  const handleFinish = (values) => {
    onFinish({ ...values, category: categorySelected });
  };

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
        name="transaction-form"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Account Book"
          name="select"
          rules={[
            {
              required: true,
              message: "Please select the account book!",
            },
          ]}
        >
          <Select labelInValue>
            {accountBookList?.map((accountBook) => (
              <Select.Option key={accountBook.id} value={accountBook.id}>
                {accountBook.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please enter the amount!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please enter the date!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please enter the type!",
            },
          ]}
        >
          <Radio.Group onChange={handleTypeChange}>
            <Radio value="income"> Income </Radio>
            <Radio value="expense"> Expense </Radio>
          </Radio.Group>
        </Form.Item>

        <CategoryGrid
          expenses={expenses}
          incomes={incomes}
          onSelect={handleCategorySelect}
          type={type}
          selected={initialValues.category}
        />

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
          style={{ textAlign: "center", marginTop: "1rem" }}
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

export default TransactionForm;
