import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Divider,
  InputNumber,
  Card,
  Statistic,
} from "antd";
import { CheckOutlined, LeftOutlined, CalculatorOutlined } from "@ant-design/icons";
import DeleteButton from "../DeleteButton";
import dayjs from "dayjs";

// import "./index.css";

const EditSavingPlanForm = ({
  title,
  onFinish,
  onCancel,
  onDelete,
  initialValues = {},
}) => {
  const [form] = Form.useForm();

  const [editCalculation, setEditCalculation] = useState({
    newTotalAmount: 0,
    newEndDate: null,
  });

  useEffect(() => {
    if (initialValues) {
      setEditCalculation({
        newTotalAmount: initialValues.amount,
        newEndDate: initialValues.end_date,
      });
    }
  }, [initialValues]);

  const handleValuesChange = (changedValues, allValues) => {
    console.log(changedValues);
    console.log(allValues);
    const { remaining_amount, remaining_periods } = allValues;

    const newTotalAmount =
      parseFloat(remaining_amount) -
      parseFloat(initialValues.remaining_amount) +
      parseFloat(initialValues.amount);

    const newEndDate = calculateNewEndDate(remaining_periods);

    setEditCalculation({
      newTotalAmount,
      newEndDate,
    });

    form.setFieldsValue({
      new_total_amount: newTotalAmount,
      new_end_date: newEndDate,
    });
  };

  const calculateNewEndDate = (periods) => {
    const start = dayjs(initialValues.end_date);
    let newEndDate;
    let additionalPeriods = periods - initialValues.remaining_periods;

    switch (initialValues.period) {
      case "week":
        newEndDate = start.add(additionalPeriods, "week");
        break;
      case "fortnight":
        newEndDate = start.add(additionalPeriods * 2, "week");
        break;
      case "month":
        newEndDate = start.add(additionalPeriods, "month");
        break;
      case "quarter":
        newEndDate = start.add(additionalPeriods * 3, "month");
        break;
      case "year":
        newEndDate = start.add(additionalPeriods, "year");
        break;
      default:
        newEndDate = start;
    }

    console.log("Calculated new end date:", newEndDate.format("YYYY-MM-DD"));
    return newEndDate;
  };

  const handleSubmit = (values) => {
    const submitData = {
      ...values,
    };

    submitData.newTotalAmount = editCalculation.newTotalAmount;
    submitData.newEndDate = editCalculation.newEndDate;

    onFinish(submitData);
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

        <Col span={8}>
          {onDelete && (
            <DeleteButton
              type={"Saving Plan"}
              name={initialValues.id}
              onDelete={onDelete}
            />
          )}
        </Col>
      </Row>

      <Divider />

      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        className="new-form"
        name="saving-plan-form"
        onFinish={handleSubmit}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the name of your saving plan!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="Start Date"
                value={initialValues.start_date.format("YYYY-MM-DD")}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title=" End Date"
                value={initialValues.end_date.format("YYYY-MM-DD")}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="Amount"
                value={initialValues.amount}
                precision={2}
                prefix="$"
                valueStyle={{ color: "#1677ff" }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="Period Type"
                value={initialValues.period.toUpperCase()}
                valueStyle={{ color: "#1677ff" }}
              />
            </Card>
          </Col>
        </Row>

        <Divider style={{ color: "#1677ff" }}>
          <CalculatorOutlined /> Savings Calculation
        </Divider>

        <Form.Item
          label="Remaining Amount"
          name="remaining_amount"
          rules={[{ required: true, message: "Please enter remaining amount!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            prefix="$"
            min={0}
            placeholder="Enter remaining amount to save"
          />
        </Form.Item>

        <Form.Item
          label="Remaining Periods"
          name="remaining_periods"
          rules={[{ required: true, message: "Please enter remaining periods!" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            placeholder="Enter remaining number of periods"
          />
        </Form.Item>

        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="New Total Amount"
                value={editCalculation.newTotalAmount}
                precision={2}
                prefix="$"
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="New End Date"
                value={
                  editCalculation.newEndDate
                    ? editCalculation.newEndDate.format("YYYY-MM-DD")
                    : "N/A"
                }
                valueStyle={{ color: "#1677ff" }}
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

export default EditSavingPlanForm;
