import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "antd";
import { EditOutlined } from "@ant-design/icons";

import AccountBookForm from "../../components/AccountBookForm";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";
import {
  editAccountBook,
  deleteAccountBook,
} from "../../store/reducers/accountBookThunk";

const EditAccountBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accountBookSelected = useSelector(
    (state) => state.accountBook.accountBookSelected
  );

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onDelete = () => {
    dispatch(deleteAccountBook(accountBookSelected.id, accountBookSelected.name));

    navigate("/account-book/overview");
  };

  const onFinish = (values) => {
    dispatch(editAccountBook(values, accountBookSelected.id));
    navigate("/account-book/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setAccountBookSelected(null));
    };
  }, [dispatch]);

  return (
    <AccountBookForm
      title={
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "#1677ff", marginTop: "0" }}>
            <EditOutlined /> Editing Account Book
          </p>
          <Divider>{accountBookSelected.name.toUpperCase()}</Divider>
        </div>
      }
      onFinish={onFinish}
      onCancel={onCancel}
      onDelete={onDelete}
      initialValues={accountBookSelected}
    />
  );
};

export default EditAccountBook;
