import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";

import {
  fetchAccountBooks,
  deleteAccountBook,
} from "../../store/reducers/accountBookThunk";

import { Button, Space, Table } from "antd";
import { PlusCircleOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";

import "./index.css";
import DeleteButton from "../../components/DeleteButton";

const { Column } = Table;

const AccountBookOverview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);
  const accountBookList = useSelector((state) => state.accountBook.accountBookList);
  // const accountBookSelected = useSelector(
  //   (state) => state.accountBook.accountBookSelected
  // );

  const newAccBookNav = () => {
    navigate("/account-book/new");
  };

  const viewAccBookNav = (item) => {
    return () => {
      dispatch(setAccountBookSelected(item));

      navigate(`/account-book/view/${item.id}`);
    };
  };

  const editAccBookNav = (item) => {
    return () => {
      dispatch(setAccountBookSelected(item));
      navigate(`/account-book/edit/${item.name}`);
    };
  };

  useEffect(() => {
    dispatch(fetchAccountBooks(userId));
  }, [dispatch, userId]);

  const newTransactionNav = (item) => {
    return () => {
      dispatch(setAccountBookSelected(item));
      navigate("/transactions/new");
    };
  };

  return (
    <div>
      <div className="header">
        <h2>Your Account Books</h2>
        <Button type="primary" className="green-button" onClick={newAccBookNav}>
          <PlusCircleOutlined /> New Account Book
        </Button>
      </div>

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
                onClick={newTransactionNav(item)}
              >
                <PlusCircleOutlined />
                New Transaction
              </Button>
              <Button type="primary" onClick={viewAccBookNav(item)}>
                <EyeOutlined />
                View
              </Button>
              <Button
                type="primary"
                className="yellow-button"
                onClick={editAccBookNav(item)}
              >
                <EditOutlined />
                Edit
              </Button>
              <DeleteButton
                type={"Account Book"}
                name={item.name}
                onDelete={() => {
                  dispatch(deleteAccountBook(item.id, item.name, userId));
                }}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default AccountBookOverview;
