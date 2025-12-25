import React, { useEffect } from "react";

import { Button, Table, Tag, Space } from "antd";
import { PlusCircleOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSavingsPlanSelected } from "../../store/reducers/savingsPlanSlice";
import {
  fetchSavingsPlans,
  deleteSavingsPlan,
} from "../../store/reducers/savingsPlanThunk";
import DeleteButton from "../../components/DeleteButton";

const { Column } = Table;
const statusColors = {
  active: "#008000",
  completed: "#1677ff",
  paused: "#ffff00",
  cancelled: "#ff0000",
};

const SavingsPlanOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savingsPlanList = useSelector((state) => state.savingsPlan.savingsPlanList);

  const newSavingsPlanNav = () => {
    navigate("/savings-plan/new");
  };

  useEffect(() => {
    dispatch(fetchSavingsPlans());
  }, [dispatch]);

  const depositNav = (item) => {
    return () => {
      dispatch(setSavingsPlanSelected(item));
      navigate(`/savings-plan/deposit/${item.id}`);
    };
  };

  const viewSavingsPlanNav = (item) => {
    return () => {
      dispatch(setSavingsPlanSelected(item));
      navigate(`/savings-plan/view/${item.id}`);
    };
  };

  const editSavingsPlanNav = (item) => {
    return () => {
      dispatch(setSavingsPlanSelected(item));
      navigate(`/savings-plan/edit/${item.name}`);
    };
  };

  return (
    <div>
      <div className="header">
        <h2>Your Savings Plans</h2>
        <Button type="primary" className="green-button" onClick={newSavingsPlanNav}>
          <PlusCircleOutlined /> New Savings Plan
        </Button>
      </div>

      <Table
        dataSource={savingsPlanList}
        rowKey="id"
        rowClassName={(record) => {
          if (record.status === "active") return "row-active";
          if (record.status === "completed") return "row-completed";
          if (record.status === "paused") return "row-paused";
          if (record.status === "cancelled") return "row-cancelled";
          return "";
        }}
      >
        <Column
          title="Name"
          dataIndex="name"
          render={(name) => {
            return (
              <>
                <b>{name.toUpperCase()}</b>
              </>
            );
          }}
        ></Column>
        <Column title="Total Amount" dataIndex="amount"></Column>
        <Column
          title="Period"
          dataIndex="period"
          render={(period) => period.toUpperCase()}
        ></Column>

        <Column
          title="Progress"
          render={(_, record) => `${record.completed_periods} / ${record.total_periods}`}
        ></Column>
        <Column
          title="Status"
          dataIndex="status"
          render={(status) => {
            return (
              <Tag className="status-tag" color={statusColors[status]}>
                <p
                  style={{
                    margin: "0",
                    border: "0",
                    color: status === "paused" ? "#000000" : "#ffffff",
                  }}
                >
                  {status}
                </p>
              </Tag>
            );
          }}
        ></Column>
        <Column
          title="Action"
          className="table-actions"
          render={(item) => {
            return (
              <Space>
                <Button
                  type="primary"
                  className="green-button"
                  onClick={depositNav(item)}
                  disabled={item.status !== "active"}
                >
                  <PlusCircleOutlined />
                  Deposit
                </Button>
                <Button type="primary" onClick={viewSavingsPlanNav(item)}>
                  <EyeOutlined />
                  View
                </Button>
                <Button
                  type="primary"
                  className="yellow-button"
                  onClick={editSavingsPlanNav(item)}
                  disabled={item.status !== "active"}
                >
                  <EditOutlined />
                  Edit
                </Button>
                <DeleteButton
                  type={"Savings Plan"}
                  name={item.name}
                  onDelete={() => {
                    dispatch(deleteSavingsPlan(item.id, item.name));
                  }}
                />
              </Space>
            );
          }}
        ></Column>
      </Table>
    </div>
  );
};

export default SavingsPlanOverview;
