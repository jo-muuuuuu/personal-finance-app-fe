import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PlusCircleOutlined } from "@ant-design/icons";

import AccountBookForm from "../../components/AccountBookForm";
import { newAccountBook } from "../../store/reducers/accountBookThunk";
import { Divider } from "antd";

const NewAccountBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userId = useSelector((state) => state.userInfo.userId);

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onFinish = (values) => {
    values = { ...values };
    dispatch(newAccountBook(values));
    navigate("/account-book/overview");
  };

  return (
    <>
      <AccountBookForm
        title={
          <p style={{ color: "#1677ff", margin: "0" }}>
            <PlusCircleOutlined /> New Account Book
          </p>
        }
        onFinish={onFinish}
        onCancel={onCancel}
        divider={true}
      />
    </>
  );
};

export default NewAccountBook;
