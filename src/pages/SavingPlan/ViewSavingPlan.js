import React, { useEffect } from "react";
import { Col, Row, Button, Divider } from "antd";

import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { LeftOutlined, CalculatorOutlined } from "@ant-design/icons";
import { setSavingPlanSelected } from "../../store/reducers/savingPlanSlice";
import { deleteSavingPlan } from "../../store/reducers/savingPlanThunk";
import DepositList from "../../components/DepositList";
import DeleteButton from "../../components/DeleteButton";

const ViewSavingPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.userInfo.userId);
  const savingPlanSelected = useSelector((state) => state.savingPlan.savingPlanSelected);

  const onCancel = () => {
    navigate("/saving-plan/overview");
  };

  const onDelete = () => {
    dispatch(deleteSavingPlan(savingPlanSelected.id, savingPlanSelected.name, userId));
    navigate("/saving-plan/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setSavingPlanSelected(null));
    };
  }, [dispatch]);

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
          <h2>Saving Plan Details</h2>
        </Col>

        <Col span={8}>
          <DeleteButton type={"Saving Plan"} onDelete={onDelete} />
        </Col>
      </Row>

      <Divider />

      <div className="transaction-detail-container">
        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Name</span>
            <span>{savingPlanSelected.name}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Start Date</span>
            <span>{new Date(savingPlanSelected.start_date).toLocaleDateString()}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">End Date</span>
            <span>{new Date(savingPlanSelected.end_date).toLocaleDateString()}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={24}>
            <span className="transaction-label">Description</span>
            <span>{savingPlanSelected.description || "N/A"}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Amount</span>
            <span>{savingPlanSelected.amount}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Period</span>
            <span>{savingPlanSelected.period}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Amount per Period</span>
            <span>{savingPlanSelected.amount_per_period}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Total Periods</span>
            <span>{savingPlanSelected.total_periods}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Completed Periods</span>
            <span>{savingPlanSelected.completed_periods}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Status</span>
            <span>{savingPlanSelected.status}</span>
          </Col>
        </Row>

        <Divider style={{ color: "#1677ff" }}>
          <CalculatorOutlined /> Deposit Records
        </Divider>

        <DepositList title={false} deposit={false} />
      </div>
    </>
  );
};

export default ViewSavingPlan;
