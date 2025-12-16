import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../../store/reducers/transactionThunk";
import { deleteAccountBook } from "../../store/reducers/accountBookThunk";
import { setAccountBookSelected } from "../../store/reducers/accountBookSlice";

import TransactionTable from "../../components/TransactionTable";

const ViewAccountBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accountBookSelected = useSelector(
    (state) => state.accountBook.accountBookSelected
  );
  const transactionList = useSelector(
    (state) => state.transaction.transactionList
  ).filter((transaction) => {
    return transaction.account_book_id === accountBookSelected.id;
    // console.log(transaction);
  });

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const onCancel = () => {
    navigate("/account-book/overview");
  };

  const onDelete = () => {
    dispatch(deleteAccountBook(accountBookSelected.id, accountBookSelected.name));
    navigate("/account-book/overview");
  };

  useEffect(() => {
    return () => {
      dispatch(setAccountBookSelected(null));
    };
  }, [dispatch]);

  return (
    <TransactionTable
      title={`Transactions in [${accountBookSelected.name}]`}
      onCancel={onCancel}
      onDelete={onDelete}
      transactionList={transactionList}
    />
  );
};

export default ViewAccountBook;
