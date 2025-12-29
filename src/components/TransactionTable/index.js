import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router";

import { Button, Space, Table, Row, Col, Divider } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  LeftOutlined,
  BarsOutlined,
} from "@ant-design/icons";

import { setTransactionSelected } from "../../store/reducers/transactionSlice";
import { deleteTransaction } from "../../store/reducers/transactionThunk";

import DeleteButton from "../DeleteButton";
import dayjs from "dayjs";
import "./index.css";

const { Column } = Table;

const TransactionTable = ({ title, onCancel, onDelete, transactionList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accountBookSelected = useSelector(
    (state) => state.accountBook.accountBookSelected
  );

  const newTransactionNav = () => {
    navigate("/transactions/new");
  };

  const editTransactionNav = (item) => {
    return () => {
      dispatch(setTransactionSelected(item));
      navigate(`/transactions/edit/${item.id}`);
    };
  };

  const viewTransactionNav = (item) => {
    return () => {
      dispatch(setTransactionSelected(item));
      navigate(`/transactions/view/${item.id}`);
    };
  };

  return (
    <div>
      {onDelete ? (
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
              <>
                <Button
                  className="green-button"
                  type="primary"
                  onClick={newTransactionNav}
                  style={{ marginRight: "1rem" }}
                >
                  <PlusCircleOutlined /> New Transaction
                </Button>

                <DeleteButton
                  type={"Account Book"}
                  name={accountBookSelected.name}
                  onDelete={onDelete}
                />
              </>
            </Col>
          </Row>

          <Row className="transaction-detail-row" gutter={16}>
            <Col className="transaction-detail-col" span={24}>
              <span className="transaction-label">Tag</span>
              <span>{accountBookSelected.tag || "N/A"}</span>
            </Col>
          </Row>

          <Row className="transaction-detail-row" gutter={16}>
            <Col className="transaction-detail-col" span={24}>
              <span className="transaction-label">Description</span>
              <span>{accountBookSelected.description || "N/A"}</span>
            </Col>
          </Row>

          <Divider style={{ color: "#1677ff" }}>
            {" "}
            <BarsOutlined /> Transaction List
          </Divider>
        </>
      ) : (
        <div className="header" style={{ display: "flex", alignContent: "center" }}>
          <h2 style={{ marginTop: "0" }}>Latest Transactions</h2>
          <Button className="green-button" type="primary" onClick={newTransactionNav}>
            <PlusCircleOutlined /> New Transaction
          </Button>
        </div>
      )}

      <Table
        dataSource={transactionList}
        rowClassName={(record) => {
          if (record.type === "expense") return "row-expense";
          if (record.type === "income") return "row-income";
          return "";
        }}
      >
        <Column
          title="Account Book"
          dataIndex="account_book_name"
          key="account_book_name"
          render={(text) => (text ? text.toUpperCase() : "N/A")}
        />
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          render={(text) =>
            text === "expense" ? (
              <p style={{ margin: 0, color: "red" }}>{text.toUpperCase()}</p>
            ) : (
              <p style={{ margin: 0, color: "green" }}>{text.toUpperCase()}</p>
            )
          }
        />
        <Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(text) => (text ? text.toUpperCase() : "N/A")}
        />
        <Column
          title="Amount"
          dataIndex="amount"
          key="amount"
          render={(text) => text || "N/A"}
        />
        <Column
          title="Date"
          dataIndex="date"
          key="date"
          render={(date) => dayjs(date).format("YYYY-MM-DD") || "N/A"}
        />
        <Column
          title="Actions"
          key="action"
          className="table-actions"
          render={(item) => (
            <Space>
              <Button type="primary" onClick={viewTransactionNav(item)}>
                <EyeOutlined />
                View
              </Button>
              <Button
                className="yellow-button"
                type="primary"
                onClick={editTransactionNav(item)}
              >
                <EditOutlined />
                Edit
              </Button>
              <DeleteButton
                type="Transaction"
                onDelete={() => {
                  dispatch(deleteTransaction(item.id));
                }}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default TransactionTable;
