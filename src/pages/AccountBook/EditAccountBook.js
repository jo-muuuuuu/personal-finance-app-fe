import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AccountBookForm from "../../components/AccountBookForm";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";
import {
  editAccountBook,
  deleteAccountBook,
} from "../../store/reducers/accountBookThunk";

const EditAccountBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);
  const accountBookSelected = useSelector(
    (state) => state.accountBook.accountBookSelected
  );

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onDelete = () => {
    dispatch(deleteAccountBook(accountBookSelected.id, accountBookSelected.name, userId));

    navigate("/account-book/overview");
  };

  const onFinish = (values) => {
    values = { ...values, userId };

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
      title={`Editing account book: [${accountBookSelected.name.toUpperCase()}]`}
      onFinish={onFinish}
      onCancel={onCancel}
      onDelete={onDelete}
      initialValues={accountBookSelected}
    />
  );
};

export default EditAccountBook;
