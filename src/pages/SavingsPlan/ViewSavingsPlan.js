import React, { useEffect } from "react";
import { Col, Row, Button, Divider, Tooltip } from "antd";

import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import {
  LeftOutlined,
  BarsOutlined,
  InfoCircleOutlined,
  CalculatorOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { setSavingsPlanSelected } from "../../store/reducers/savingsPlanSlice";
import {
  deleteSavingsPlan,
  editSavingPlansStatus,
} from "../../store/reducers/savingsPlanThunk";
import DepositList from "../../components/DepositList";
import DeleteButton from "../../components/DeleteButton";
import "./index.css";

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

  const handleSavingsPlanActions = (action) => {
    return () => {
      // console.log(action);
      dispatch(editSavingPlansStatus(savingsPlanSelected.id, action));
      navigate("/savings-plan/overview");
    };
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
          <h2>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#1677ff", marginTop: "0" }}>
                <EyeOutlined /> Viewing Savings Plan
              </p>
              <Divider>{savingsPlanSelected.name.toUpperCase()}</Divider>
            </div>
          </h2>
        </Col>

        <Col span={8}>
          <DeleteButton type={"Savings Plan"} onDelete={onDelete} />
        </Col>
      </Row>

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
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Target Amount</span>
            <span>{savingsPlanSelected.amount}</span>
          </Col>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Deposited Amount</span>
            <span>{savingsPlanSelected.deposited_amount}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Period</span>
            <span>{savingsPlanSelected.period.toUpperCase()}</span>
          </Col>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">
              Amount per Period&nbsp;
              <Tooltip title="This value is calculated based on the current plan status and may change when the savings plan is modified.">
                <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
              </Tooltip>
            </span>
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
          <CalculatorOutlined /> Actions
        </Divider>
        <Row gutter={16}>
          <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
            <Button
              type="primary"
              className="green-button savings-plan-actions-btn"
              disabled={savingsPlanSelected.status !== "paused"}
              onClick={handleSavingsPlanActions("resume")}
            >
              Resume
            </Button>
          </Col>

          <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
            <Button
              type="primary"
              className="yellow-button savings-plan-actions-btn"
              disabled={savingsPlanSelected.status !== "active"}
              onClick={handleSavingsPlanActions("pause")}
            >
              Pause
            </Button>
          </Col>

          <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
            <Button
              type="primary"
              className="savings-plan-actions-btn"
              danger
              disabled={savingsPlanSelected.status === "cancelled"}
              onClick={handleSavingsPlanActions("terminate")}
            >
              Terminate
            </Button>
          </Col>
        </Row>

        <Divider style={{ color: "#1677ff" }}>
          <BarsOutlined /> Deposit Records
        </Divider>

        <DepositList title={false} deposit={false} />
      </div>
    </>
  );
};

export default ViewSavingsPlan;
