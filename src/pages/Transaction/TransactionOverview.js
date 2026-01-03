import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { fetchAccountBooks } from "../../store/reducers/accountBookThunk";
import { fetchTransactions } from "../../store/reducers/transactionThunk";
import TransactionTable from "../../components/TransactionTable";
import BannedImg from "../../assets/imgs/banned.png";
import NoDataImg from "../../assets/imgs/no-data.png";
import EmptyState from "../EmptyState";

const TransactionOverview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accountBookList = useSelector((state) => state.accountBook.accountBookList);

  const transactionList = useSelector((state) => state.transaction.transactionList);

  const newTransactionNav = () => {
    return navigate("/transactions/new");
  };

  const newAccBookNav = () => {
    return navigate("/account-book/new");
  };

  useEffect(() => {
    dispatch(fetchAccountBooks());

    dispatch(fetchTransactions());
  }, [dispatch]);

  if (!accountBookList || accountBookList.length === 0) {
    return (
      <EmptyState
        img={BannedImg}
        alt="No account books"
        title="Nothing To Record Yet"
        description="Transactions must belong to an account book. Create one to start recording your
          income and expenses."
        nav={newAccBookNav}
        btnText="Create Your First Account Book"
      />
    );
  }

  return transactionList && transactionList.length !== 0 ? (
    <div>
      <div className="header" style={{ display: "flex", alignContent: "center" }}>
        <h2 style={{ marginTop: "0" }}>Latest Transactions</h2>
        <Button className="green-button" type="primary" onClick={newTransactionNav}>
          <PlusCircleOutlined /> New Transaction
        </Button>
      </div>
      <TransactionTable transactionList={transactionList} />
    </div>
  ) : (
    <div style={{ marginTop: "100px" }}>
      <EmptyState
        img={NoDataImg}
        alt="No transactions"
        title="Start Tracking Your Finances"
        description="Add your first transaction to see balances, trends, and insights for your account
        books."
        nav={newTransactionNav}
        btnText="Add Your First Transaction"
      />
    </div>
  );
};

export default TransactionOverview;
