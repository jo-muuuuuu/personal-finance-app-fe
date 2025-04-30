import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button, Divider, List, Space, Table } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import axios from "axios";

import "./index.css";
import { getToken } from "../../utils";

const { Column } = Table;

const AccountBookOverview = () => {
  const [accountBookList, setAccountBookList] = useState([]);
  const navigate = useNavigate();

  const id = useSelector((state) => state.userInfo.userId);

  const newAccBookNav = () => {
    navigate("/account-book/new");
  };

  const fetchAccountBooks = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/account-books`, {
        headers: {
          id,
          token: getToken(),
        },
      })
      .then((response) => {
        // console.log(response.data.accountBookList);
        setAccountBookList(response.data.accountBookList);
      })
      .catch((error) => {
        console.error("Error fetching account books:", error);
      });
  };

  useEffect(() => {
    fetchAccountBooks();
  }, []);

  return (
    <div>
      <div className="header">
        <h2>Your Account Books</h2>
        <Button type="primary" className="green-button" onClick={newAccBookNav}>
          <PlusCircleOutlined /> New Account Books
        </Button>
      </div>
      <Divider style={{ margin: 0 }} />

      <Table dataSource={accountBookList}>
        <Column
          title="Account Book"
          dataIndex="name"
          key="account_book"
          render={(text) => text.toUpperCase()}
        />
        <Column title="Tag" dataIndex="tag" key="tag" render={(text) => text || "N/A"} />
        <Column
          title="Description"
          dataIndex="description"
          key="description"
          render={(text) => text || "N/A"}
        />
        <Column
          title="Actions"
          key="action"
          className="table-actions"
          render={(item) => (
            <Space>
              <Button
                type="primary"
                className="green-button"
                // onClick={newTransactionNav(item.id, item.name)}
              >
                <PlusCircleOutlined />
                New Transaction
              </Button>
              <Button
                type="primary"
                // onClick={viewAccBookNav(item.id, item.name)}
              >
                <EyeOutlined />
                View
              </Button>
              <Button
                type="primary"
                className="yellow-button"
                // onClick={editAccBookNav(item)}
              >
                <EditOutlined />
                Edit
              </Button>
              <Button
                // className="list-btn-danger"
                danger
                type="primary"
                // onClick={deleteAccountBook(item.id, item.name)}
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

export default AccountBookOverview;
