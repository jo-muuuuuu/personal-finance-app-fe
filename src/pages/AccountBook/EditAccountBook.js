import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AccountBookForm from "../../components/AccountBookForm";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";
import { editAccountBook } from "../../store/reducers/accountBookThunk";

const EditAccountBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.userInfo.userId);
  const accountBookSelected = useSelector(
    (state) => state.accountBook.accountBookSelected
  );

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onFinish = (values) => {
    values = { ...values, userId: id };

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
      initialValues={accountBookSelected}
    />
  );
};

export default EditAccountBook;
