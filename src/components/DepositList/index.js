import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Table,
  Tag,
  Input,
  Popconfirm,
  Tooltip,
  Divider,
  Card,
  Statistic,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  PlusOutlined,
  LeftOutlined,
  CheckOutlined,
  StopOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  confirmDeposit,
  fetchDeposits,
  resetDeposit,
} from "../../store/reducers/depositThunk";
import { fetchSavingsPlanById } from "../../store/reducers/savingsPlanThunk";
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
  const savingsPlanSelected = useSelector(
    (state) => state.savingsPlan.savingsPlanSelected
  );
  const [editableAmount, setEditableAmount] = useState(null);

  useEffect(() => {
    if (savingsPlanSelected) {
      dispatch(fetchDeposits(savingsPlanSelected.id));
    }
  }, [savingsPlanSelected, dispatch]);

  const firstPendingIndex = deposits.findIndex((d) => d.status === "pending");

  const onCancel = () => {
    navigate("/savings-plan/overview");
  };

  const onConfirmDeposit = (item) => {
    return () => {
      dispatch(confirmDeposit({ ...item, editableAmount }))
        .then(() => {
          if (savingsPlanSelected) {
            dispatch(fetchSavingsPlanById(savingsPlanSelected.id));
          }
          setEditableAmount(null);
        })
        .catch((error) => {
          console.error("Error confirming deposit:", error);
        });
    };
  };

  const onResetDeposit = (item) => {
    return () => {
      dispatch(resetDeposit(item))
        .then(() => {
          if (savingsPlanSelected) {
            dispatch(fetchSavingsPlanById(savingsPlanSelected.id));
          }
        })
        .catch((error) => {
          console.error("Error resetting deposit:", error);
        });
    };
  };

  return (
    <>
      {title && savingsPlanSelected && (
        <>
          <Row className="view-transaction-header">
            <Col span={8}>
              <Button type="primary" onClick={onCancel}>
                <LeftOutlined />
                Cancel
              </Button>
            </Col>
            <Col span={8}>
              <h2>Deposit Records of [{savingsPlanSelected.name.toUpperCase()}]</h2>
            </Col>
            <Col span={8}></Col>
          </Row>

          <Divider />

          <Row gutter={16} style={{ marginBottom: "2rem", marginTop: "1rem" }}>
            <Col span={12}>
              <Card size="small">
                <Statistic
                  title="Periods"
                  value={`${savingsPlanSelected.completed_periods} / ${savingsPlanSelected.total_periods}`}
                  valueStyle={{ color: "#3f8600" }}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small">
                <Statistic
                  title="Amount"
                  prefix={"$"}
                  value={`${savingsPlanSelected.deposited_amount} / ${savingsPlanSelected.amount}`}
                  valueStyle={{ color: "#3f8600" }}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}

      <Table
        dataSource={deposits}
        rowClassName={(record, index) =>
          record.status === "completed" ? "row-completed" : ""
        }
      >
        <Column title="Number" key="index" render={(_, __, index) => index + 1} />

        <Column
          title={
            <span>
              Scheduled Amount&nbsp;
              <Tooltip title="This value is set when the deposit record is created and will not be updated.">
                <InfoCircleOutlined style={{ color: "#8c8c8c" }} />
              </Tooltip>
            </span>
          }
          dataIndex="scheduled_amount"
          key="scheduled_amount"
        />

        <Column
          title="Deposited Amount"
          dataIndex="deposited_amount"
          key="deposited_amount"
          render={(deposited_amount, record, index) => {
            if (deposit && index === firstPendingIndex) {
              return (
                <Input
                  value={editableAmount ?? deposited_amount}
                  onChange={(e) => setEditableAmount(e.target.value)}
                />
              );
            }
            return deposited_amount;
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

              const buttonText = isCompleted ? "Confirmed" : "Confirm Deposit";

              if (isCompleted) {
                return (
                  <>
                    <Button type="default" disabled icon={<CheckOutlined />}>
                      {buttonText}
                    </Button>
                    <Button
                      type="primary"
                      danger
                      icon={<StopOutlined />}
                      style={{ marginLeft: "1rem" }}
                      onClick={onResetDeposit(item)}
                    >
                      Reset
                    </Button>
                  </>
                );
              }

              if (isFirstPending) {
                return (
                  <>
                    <Popconfirm
                      title="Confirm Deposit"
                      description="Are you sure you want to confirm this deposit?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={onConfirmDeposit(item)}
                    >
                      <Button
                        type="primary"
                        className="green-button"
                        icon={<PlusOutlined />}
                      >
                        {buttonText}
                      </Button>
                    </Popconfirm>
                    <Button
                      type="primary"
                      danger
                      disabled
                      icon={<StopOutlined />}
                      style={{ marginLeft: "1rem" }}
                      onClick={onResetDeposit(item)}
                    >
                      Reset
                    </Button>
                  </>
                );
              }

              return (
                <>
                  <Button type="default" disabled>
                    {buttonText}
                  </Button>
                  <Button
                    type="primary"
                    danger
                    disabled
                    icon={<StopOutlined />}
                    style={{ marginLeft: "1rem" }}
                    onClick={onResetDeposit(item)}
                  >
                    Reset
                  </Button>
                </>
              );
            }}
          />
        )}
      </Table>
    </>
  );
};

export default DepositList;
