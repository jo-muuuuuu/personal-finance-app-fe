import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import { getToken } from "../../utils";

import { Button, Divider, Space, Table } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { antdError, antdSuccess } from "../../utils/antdMessage";
import { setTransactionSelected } from "../../store/reducers/accountBook";

const { Column } = Table;

const TransactionOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.userInfo.userId);

  const newTransactionNav = () => {
    navigate("/transactions/new");
  };

  const editTransactionNav = (item) => {
    return () => {
      dispatch(setTransactionSelected(item));
      navigate(`/transactions/edit/${item.id}`);
    };
  };

  const fetchTransactions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/transactions`, {
        headers: {
          id,
          token: getToken(),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log("Success!", response.data.transactionList);

          setTransactions(response.data.transactionList);
          // antdSuccess("Success!");
        }
      })
      .catch((error) => {
        // console.error("Error!", error);
        antdError("Failed to fetch transactions!");
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = (id) => {
    return () => {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/transactions/${id}`, {
          headers: {
            token: getToken(),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Success!", response.data);
            antdSuccess(`Transaction deleted successfully!`);
            fetchTransactions();
          }
        })
        .catch((error) => {
          console.error("Error!", error);
          antdError("Failed to delete transaction!");
        });
    };
  };

  return (
    <div>
      <div className="header">
        <h2>Latest Transactions</h2>
        <Button className="green-button" type="primary" onClick={newTransactionNav}>
          <PlusCircleOutlined /> New Transaction
        </Button>
      </div>
      <Divider />

      <Table dataSource={transactions}>
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
                className="yellow-button"
                type="primary"
                // onClick={viewTransactionNav(item)}
              >
                <EyeOutlined />
                View
              </Button>
              <Button
                className="list-btn"
                type="primary"
                onClick={editTransactionNav(item)}
              >
                <EditOutlined />
                Edit
              </Button>
              <Button danger type="primary" onClick={deleteTransaction(item.id)}>
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
