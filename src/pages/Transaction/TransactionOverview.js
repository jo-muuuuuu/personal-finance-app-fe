import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Divider, Space, Table } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { setTransactionSelected } from "../../store/reducers/transactionSlice";
import {
  fetchTransactions,
  deleteTransaction,
} from "../../store/reducers/transactionThunk";

const { Column } = Table;

const TransactionOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);
  const transactionList = useSelector((state) => state.transaction.transactionList);

  const newTransactionNav = () => {
    navigate("/transactions/new");
  };

  const editTransactionNav = (item) => {
    return () => {
      dispatch(setTransactionSelected(item));
      navigate(`/transactions/edit/${item.id}`);
    };
  };

  useEffect(() => {
    dispatch(fetchTransactions(userId));
  }, [dispatch, userId]);

  return (
    <div>
      <div className="header">
        <h2>Latest Transactions</h2>
        <Button className="green-button" type="primary" onClick={newTransactionNav}>
          <PlusCircleOutlined /> New Transaction
        </Button>
      </div>

      <Table dataSource={transactionList}>
        <Column
          title="Account Book"
          dataIndex="account_book_name"
          key="account_book_name"
          render={(text) => (text ? text.toUpperCase() : "N/A")}
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
          render={(date) => new Date(date).toLocaleDateString() || "N/A"}
        />
        <Column
          title="Actions"
          key="action"
          className="table-actions"
          render={(item) => (
            <Space>
              <Button
                type="primary"
                // onClick={viewTransactionNav(item)}
              >
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
              <Button
                danger
                type="primary"
                onClick={() => {
                  dispatch(deleteTransaction(item.id, userId));
                }}
              >
                <DeleteOutlined />
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default TransactionOverview;
