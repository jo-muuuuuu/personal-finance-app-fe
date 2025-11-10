import React, { useEffect, useState } from "react";
import { Col, Row, Button, Table, Tag, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { PlusOutlined, LeftOutlined, CheckOutlined } from "@ant-design/icons";
import { confirmDeposit, fetchDeposits } from "../../store/reducers/depositThunk";
import { setDepositList } from "../../store/reducers/depositSlicer";
import "./index.css";
import dayjs from "dayjs";

const { Column } = Table;
const statusColors = {
  pending: "yellow",
  completed: "green",
};

const DepositList = ({ title = true, deposit = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deposits = useSelector((state) => state.deposit.depositList);
  const savingPlanSelected = useSelector((state) => state.savingPlan.savingPlanSelected);
  const [editableAmount, setEditableAmount] = useState(null);

  useEffect(() => {
    if (savingPlanSelected) {
      dispatch(fetchDeposits(savingPlanSelected.id));
    }
  }, [savingPlanSelected, dispatch]);

  const firstPendingIndex = deposits.findIndex((d) => d.status === "pending");

  const onCancel = () => {
    navigate("/saving-plan/overview");
  };

  const onConfirmDeposit = (item) => {
    return () => {
      dispatch(confirmDeposit({ ...item, editableAmount }));

      setEditableAmount(null);
      dispatch(fetchDeposits(savingPlanSelected.id));
    };
  };

  return (
    <>
      {title && (
        <Row className="view-transaction-header">
          <Col span={8}>
            <Button type="primary" onClick={onCancel}>
              <LeftOutlined />
              Cancel
            </Button>
          </Col>
          <Col span={8}>
            <h2>Deposit Records of [{savingPlanSelected.name.toUpperCase()}]</h2>
          </Col>
          <Col span={8}></Col>
        </Row>
      )}

      <Table
        dataSource={deposits}
        rowClassName={(record, index) =>
          record.status === "completed" ? "row-completed" : ""
        }
      >
        <Column title="Number" key="index" render={(_, __, index) => index + 1} />
        <Column
          title="Amount"
          dataIndex="amount"
          key="amount"
          render={(amount, record, index) => {
            if (deposit && index === firstPendingIndex) {
              return (
                <Input
                  value={editableAmount ?? amount}
                  onChange={(e) => setEditableAmount(e.target.value)}
                />
              );
            }
            return amount;
          }}
        />
        <Column
          title="Due Date"
          dataIndex="date"
          key="date"
          render={(date) => dayjs(date).format("YYYY-MM-DD") || "N/A"}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => {
            return <Tag color={statusColors[status]}>{status}</Tag>;
          }}
        />
        {deposit && (
          <Column
            title="Action"
            render={(item, record, index) => {
              const isFirstPending = index === firstPendingIndex;
              const isCompleted = record.status === "completed";

              const buttonProps = {
                type: "primary",
                className: isFirstPending ? "green-button" : undefined,
                disabled: !isFirstPending,
                onClick: isFirstPending ? onConfirmDeposit(item, index) : undefined,
              };

              const buttonText = isCompleted ? "Confirmed" : "Confirm Deposit";

              return (
                <Button {...buttonProps}>
                  {isFirstPending ? <PlusOutlined /> : <CheckOutlined />}
                  {buttonText}
                </Button>
              );
            }}
          />
        )}
      </Table>
    </>
  );
};

export default DepositList;
