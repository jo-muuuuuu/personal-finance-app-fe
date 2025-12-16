import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchTransactions } from "../../store/reducers/transactionThunk";
import TransactionTable from "../../components/TransactionTable";

const TransactionOverview = () => {
  const dispatch = useDispatch();

  const transactionList = useSelector((state) => state.transaction.transactionList);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return <TransactionTable transactionList={transactionList} />;
};

export default TransactionOverview;
