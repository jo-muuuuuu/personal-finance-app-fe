import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  InputNumber,
  DatePicker,
  Select,
  Card,
  Statistic,
} from "antd";
import { CheckOutlined, LeftOutlined, CalculatorOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import { antdError } from "../../utils/antdMessage";

// import "./index.css";

const { Option } = Select;

const periodOptions = [
  { label: "Week", value: "week" },
  { label: "Fortnight", value: "fortnight" },
  { label: "Month", value: "month" },
  { label: "Quarter", value: "quarter" },
  { label: "Year", value: "year" },
];

const NewSavingsPlanForm = ({ title, onFinish, onCancel }) => {
  const [form] = Form.useForm();

  const [calculation, setCalculation] = useState({
    totalPeriods: 0,
    periodType: "",
    amountPerPeriod: 0,
    isValid: false,
  });

  const handleValuesChange = (changedValues, allValues) => {
    // console.log(changedValues);

    const { start_date, end_date, amount, period } = allValues;

    if (!start_date || !end_date || !amount || !period) return;

    if (dayjs(end_date).isBefore(dayjs(start_date))) {
      antdError("End date must be after start date");
      return;
    }

    let totalPeriods = 0;
    if (period === "fortnight") {
      totalPeriods = Math.ceil(dayjs(end_date).diff(dayjs(start_date), "week", true) / 2);
    } else {
      totalPeriods = Math.ceil(dayjs(end_date).diff(dayjs(start_date), period, true));
    }

    const amountPerPeriod = amount / totalPeriods;

    setCalculation({
      totalPeriods,
      periodType: period,
      amountPerPeriod,
      isValid: true,
    });
  };

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

        <Col span={8}></Col>
      </Row>

      <Divider />

      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="new-form"
        name="savings-plan-form"
        onFinish={(values) => {
          onFinish({
            ...values,
            totalPeriods: calculation.totalPeriods,
            amountPerPeriod: calculation.amountPerPeriod,
          });
        }}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the name of your savings plan!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          label="Start Date"
          name="start_date"
          rules={[{ required: true, message: "Please select a start date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="End Date"
          name="end_date"
          rules={[{ required: true, message: "Please select a end date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please enter the savings amount per period!" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} prefix="$" min={0} />
        </Form.Item>

        <Form.Item
          label="Period"
          name="period"
          rules={[{ required: true, message: "Please select a period!" }]}
          tooltip="Choose how often you will save"
        >
          <Select placeholder="Select savings period">
            {periodOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Divider style={{ color: "#1677ff" }}>
          <CalculatorOutlined /> Savings Calculation
        </Divider>

        <Row gutter={16}>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="Total Periods"
                value={calculation.totalPeriods}
                suffix={
                  calculation.isValid ? `\u00D7 ${calculation.periodType}` : "period"
                }
                valueStyle={{ color: calculation.isValid ? "#3f8600" : "#cf1322" }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="Amount per Period"
                value={calculation.amountPerPeriod}
                precision={2}
                prefix="$"
                valueStyle={{ color: calculation.isValid ? "#3f8600" : "#cf1322" }}
              />
            </Card>
          </Col>
        </Row>

        <Form.Item
          wrapperCol={{ span: 24 }}
          style={{ textAlign: "center", marginTop: 24 }}
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

export default NewSavingsPlanForm;
