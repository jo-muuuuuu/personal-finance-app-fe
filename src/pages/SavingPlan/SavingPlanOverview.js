import React, { useEffect } from "react";

import { Button, Table, Tag, Space } from "antd";
import { PlusCircleOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSavingPlanSelected } from "../../store/reducers/savingPlanSlice";
import { fetchSavingPlans, deleteSavingPlan } from "../../store/reducers/savingPlanThunk";
import DeleteButton from "../../components/DeleteButton";
// import dayjs from "dayjs";

const { Column } = Table;
const statusColors = {
  active: "red",
  completed: "green",
  paused: "yellow",
  cancelled: "grey",
};

const SavingPlanOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);
  const savingPlanList = useSelector((state) => state.savingPlan.savingPlanList);

  const newSavingPlanNav = () => {
    navigate("/saving-plan/new");
  };

  useEffect(() => {
    dispatch(fetchSavingPlans(userId));
  }, [dispatch, userId]);

  const viewSavingPlanNav = (item) => {
    return () => {
      dispatch(setSavingPlanSelected(item));
      navigate(`/saving-plan/view/${item.id}`);
    };
  };

  const editSavingPlanNav = (item) => {
    return () => {
      dispatch(setSavingPlanSelected(item));
      navigate(`/saving-plan/edit/${item.name}`);
    };
  };

  return (
    <div>
      <div className="header">
        <h2>Your Saving Plans</h2>
        <Button type="primary" className="green-button" onClick={newSavingPlanNav}>
          <PlusCircleOutlined /> New Saving Plan
        </Button>
      </div>

      <Table dataSource={savingPlanList}>
        <Column
          title="Name"
          dataIndex="name"
          render={(name) => {
            return (
              <>
                {/* <DownCircleOutlined />
                &nbsp; */}
                <b>{name.toUpperCase()}</b>
              </>
            );
          }}
        ></Column>
        <Column title="Total Amount" dataIndex="amount"></Column>
        <Column title="Period" dataIndex="period"></Column>

        {/* <Column title="Amount per Period" dataIndex="amount_per_period"></Column> */}
        {/* <Column
          title="Next Deposit Date"
          dataIndex="start_date"
          render={(date) => dayjs(date).format("YYYY-MM-DD") || "N/A"}
        ></Column> */}
        <Column
          title="Progress"
          render={(_, record) => `${record.completed_periods} / ${record.total_periods}`}
        ></Column>
        <Column
          title="Status"
          dataIndex="status"
          render={(status) => {
            return <Tag color={statusColors[status]}>{status}</Tag>;
          }}
        ></Column>
        <Column
          title="Action"
          className="table-actions"
          render={(item) => {
            return (
              <Space>
                <Button type="primary" onClick={viewSavingPlanNav(item)}>
                  <EyeOutlined />
                  View
                </Button>
                <Button
                  type="primary"
                  className="yellow-button"
                  onClick={editSavingPlanNav(item)}
                >
                  <EditOutlined />
                  Edit
                </Button>
                <DeleteButton
                  type={"Saving Plan"}
                  name={item.name}
                  onDelete={() => {
                    dispatch(deleteSavingPlan(item.id, item.name, userId));
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

export default SavingPlanOverview;
