import React, { useEffect } from "react";
import { Col, Row, Button, Divider } from "antd";

import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { LeftOutlined, CalculatorOutlined } from "@ant-design/icons";
import { setSavingsPlanSelected } from "../../store/reducers/savingsPlanSlice";
import { deleteSavingsPlan } from "../../store/reducers/savingsPlanThunk";
import DepositList from "../../components/DepositList";
import DeleteButton from "../../components/DeleteButton";

const ViewSavingsPlan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savingsPlanSelected = useSelector(
    (state) => state.savingsPlan.savingsPlanSelected
  );

  const onCancel = () => {
    navigate("/savings-plan/overview");
  };

  const onDelete = () => {
    dispatch(deleteSavingsPlan(savingsPlanSelected.id, savingsPlanSelected.name));
    navigate("/savings-plan/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setSavingsPlanSelected(null));
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
          <h2>Savings Plan Details</h2>
        </Col>

        <Col span={8}>
          <DeleteButton type={"Savings Plan"} onDelete={onDelete} />
        </Col>
      </Row>

      <Divider />

      <div className="transaction-detail-container">
        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Name</span>
            <span>{savingsPlanSelected.name}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Start Date</span>
            <span>{new Date(savingsPlanSelected.start_date).toLocaleDateString()}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">End Date</span>
            <span>{new Date(savingsPlanSelected.end_date).toLocaleDateString()}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={24}>
            <span className="transaction-label">Description</span>
            <span>{savingsPlanSelected.description || "N/A"}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Amount</span>
            <span>{savingsPlanSelected.amount}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Period</span>
            <span>{savingsPlanSelected.period}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Amount per Period</span>
            <span>{savingsPlanSelected.amount_per_period}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Total Periods</span>
            <span>{savingsPlanSelected.total_periods}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Completed Periods</span>
            <span>{savingsPlanSelected.completed_periods}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Status</span>
            <span>{savingsPlanSelected.status}</span>
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

export default ViewSavingsPlan;
