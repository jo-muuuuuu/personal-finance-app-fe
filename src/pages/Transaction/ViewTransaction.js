import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTransactionSelected } from "../../store/reducers/transactionSlice";
import { deleteTransaction } from "../../store/reducers/transactionThunk";
import { useNavigate } from "react-router";

import { Col, Row, Button, Divider } from "antd";
import { EyeOutlined, LeftOutlined } from "@ant-design/icons";

import "./index.css";
import DeleteButton from "../../components/DeleteButton";

const ViewTransaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const transactionSelected = useSelector(
    (state) => state.transaction.transactionSelected
  );

  const onCancel = () => {
    navigate("/transactions/overview");
  };

  const onDelete = () => {
    dispatch(deleteTransaction(transactionSelected.id));
    navigate("/transactions/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setTransactionSelected(null));
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
                <EyeOutlined /> Viewing Transaction
              </p>
              <Divider>ID - {transactionSelected.id}</Divider>
            </div>
          </h2>
        </Col>

        <Col span={8}>
          <DeleteButton
            type={"Transaction"}
            name={transactionSelected.id}
            onDelete={onDelete}
          />
        </Col>
      </Row>

      <div className="transaction-detail-container">
        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Account Book</span>
            <span>{transactionSelected.account_book_name}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Amount</span>
            <span>{transactionSelected.amount}</span>
          </Col>
          <Col className="transaction-detail-col" span={8}>
            <span className="transaction-label">Date</span>
            <span>{new Date(transactionSelected.date).toLocaleDateString()}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={24}>
            <span className="transaction-label">Description</span>
            <span>{transactionSelected.description || "N/A"}</span>
          </Col>
        </Row>

        <Row className="transaction-detail-row" gutter={16}>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Type</span>
            <span>{transactionSelected.type}</span>
          </Col>
          <Col className="transaction-detail-col" span={12}>
            <span className="transaction-label">Category</span>
            <span>{transactionSelected.category}</span>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ViewTransaction;
