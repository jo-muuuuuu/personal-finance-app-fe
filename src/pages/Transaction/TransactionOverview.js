import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTransactions } from "../../store/reducers/transactionThunk";
import TransactionTable from "../../components/TransactionTable";

const TransactionOverview = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userInfo.userId);
  const transactionList = useSelector((state) => state.transaction.transactionList);

  useEffect(() => {
    dispatch(fetchTransactions(userId));
  }, [dispatch, userId]);

  return <TransactionTable transactionList={transactionList} />;
};

export default TransactionOverview;
