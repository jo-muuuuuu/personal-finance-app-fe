import React, { useEffect, useMemo } from "react";
import { Col, Row, Button, Dropdown, Card, Statistic, Empty } from "antd";
import { DownCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import LineChart from "../../components/ECharts/LineChart";
import PieChart from "../../components/ECharts/PieChart";

import { fetchAccountBooks } from "../../store/reducers/accountBookThunk";
import { fetchTransactions } from "../../store/reducers/transactionThunk";
import { fetchDeposits } from "../../store/reducers/depositThunk";
import TransactionTable from "../../components/TransactionTable";
import DepositList from "../../components/DepositList";
import "./index.css";
import EmptyState from "../EmptyState";
import NoSignalImg from "../../assets/imgs/no-signal.png";
import BannedImg from "../../assets/imgs/banned.png";
import NoDataImg from "../../assets/imgs/no-data.png";
import LightBulbImg from "../../assets/imgs/lightbulb.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dropdownItems = [
    {
      key: "1",
      label: (
        <p
          className="dashboard-dropdown-item"
          onClick={() => {
            navigate("/account-book/new");
          }}
        >
          <PlusCircleOutlined /> New Account Book
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          className="dashboard-dropdown-item"
          onClick={() => {
            navigate("/transactions/new");
          }}
        >
          <PlusCircleOutlined /> New Transaction
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p
          className="dashboard-dropdown-item"
          onClick={() => {
            navigate("/savings-plan/new");
          }}
        >
          <PlusCircleOutlined /> New Savings Plan
        </p>
      ),
    },
  ];

  const nickname = useSelector((state) => state.userInfo.userNickname);
  const accountBookList = useSelector((state) => state.accountBook.accountBookList);

  const transactionList = useSelector((state) => state.transaction.transactionList);
  const recentTransactions = transactionList.slice(0, 5);

  const depositList = useSelector((state) => state.deposit.depositList);
  const recentDeposits = depositList
    .filter((deposit) => deposit.status === "pending")
    .slice(0, 5);

  const { income, expense } = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const thisMonthTransaction = transactionList.filter((transaction) => {
      const date = new Date(transaction.date);
      return date >= start && date <= end;
    });

    const income = thisMonthTransaction
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const expense = thisMonthTransaction
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    return { income, expense };
  }, [transactionList]);

  const { pending, completed } = useMemo(() => {
    const completed = depositList
      .filter((deposit) => deposit.status === "completed")
      .reduce((sum) => (sum += 1), 0);

    const pending = depositList
      .filter((deposit) => deposit.status === "pending")
      .reduce((sum) => (sum += 1), 0);

    // console.log(pending, completed);
    return { pending, completed };
  }, [recentDeposits]);

  const newTransactionNav = () => {
    return navigate("/transactions/new");
  };

  const newAccBookNav = () => {
    return navigate("/account-book/new");
  };

  const newSavingsPlanNav = () => {
    navigate("/savings-plan/new");
  };

  useEffect(() => {
    dispatch(fetchAccountBooks());
    dispatch(fetchTransactions());
    dispatch(fetchDeposits());
  }, [dispatch]);

  if (accountBookList.length === 0 && depositList.length === 0) {
    return (
      <EmptyState
        nickname={nickname}
        img={NoSignalImg}
        alt="welcome"
        description="Track your income, expenses, and savings all in one place."
        dropdown={true}
      />
    );
  }

  return (
    <div>
      <div className="header" style={{ display: "flex", alignContent: "center" }}>
        <h2 style={{ marginTop: "0" }}>Dashboard</h2>
        <Dropdown
          menu={{ items: dropdownItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button type="primary">
            Quick Actions <DownCircleOutlined />
          </Button>
        </Dropdown>
      </div>

      <Row>
        <Col span={6} className="dashboard-flex-center">
          <Card size="small" style={{ width: "80%" }}>
            <Statistic
              title={<p className="dashboard-stat-title">This Month Income</p>}
              value={!income || income === 0 ? "No Data Yet" : `$ ${income}`}
              // prefix={"$"}
              valueStyle={{ color: !income || income === 0 ? "#808080" : "#3f8600" }}
            />
          </Card>
        </Col>

        <Col span={6} className="dashboard-flex-center">
          <Card size="small" style={{ width: "80%" }}>
            <Statistic
              title={<p className="dashboard-stat-title">This Month Expense</p>}
              value={!expense || expense === 0 ? "No Data Yet" : `$ ${expense}`}
              // prefix={"$"}
              valueStyle={{ color: !expense || expense === 0 ? "#808080" : "#cf1322" }}
            />
          </Card>
        </Col>

        <Col span={6} className="dashboard-flex-center">
          <Card size="small" style={{ width: "80%" }}>
            <Statistic
              title={<p className="dashboard-stat-title">Pending Deposits</p>}
              value={pending ? `${pending}` : "No Data Yet"}
              // suffix={"%"}
              valueStyle={{ color: pending ? "#3f8600" : "#808080" }}
            />
          </Card>
        </Col>

        <Col span={6} className="dashboard-flex-center">
          <Card size="small" style={{ width: "80%" }}>
            <Statistic
              title={<p className="dashboard-stat-title">Completed Deposits</p>}
              value={completed ? `${completed}` : "No Data Yet"}
              // suffix={"%"}
              valueStyle={{ color: completed ? "#3f8600" : "#808080" }}
            />
          </Card>
        </Col>
      </Row>

      {transactionList.length === 0 ? (
        accountBookList.length === 0 ? (
          <Card style={{ marginTop: "1rem" }}>
            <EmptyState
              img={BannedImg}
              smallImg={true}
              alt="No account books"
              title="Nothing To Record Yet"
              description="Transactions must belong to an account book. Create one to start recording your
          income and expenses."
              nav={newAccBookNav}
              btnText="Create Your First Account Book"
            />
          </Card>
        ) : (
          <Card style={{ marginTop: "1rem" }}>
            <EmptyState
              img={NoDataImg}
              smallImg={true}
              alt="No transactions"
              title="Start Tracking Your Finances"
              description="Add your first transaction to see balances, trends, and insights for your account
        books."
              nav={newTransactionNav}
              btnText="Add Your First Transaction"
            />
          </Card>
        )
      ) : (
        <Row className="dashboard-row">
          <Col span={12} className="dashboard-flex-center">
            <LineChart />
          </Col>

          <Col span={12} className="dashboard-flex-center">
            <PieChart />
          </Col>
        </Row>
      )}

      {depositList.length === 0 ? (
        <Card style={{ marginTop: "1rem" }}>
          <EmptyState
            img={LightBulbImg}
            smallImg={true}
            alt="No savings plan"
            title="Start Saving With A Plan"
            description="Savings plans help you reach your financial goals step by step."
            nav={newSavingsPlanNav}
            btnText="Create Your First Savings Plan"
          />
        </Card>
      ) : (
        <Row className="dashboard-row">
          <Col
            span={transactionList.length !== 0 ? 12 : 24}
            className="dashboard-flex-center"
          >
            <Card className="list-card" title="Upcoming Deposits">
              <DepositList
                title={false}
                deposit={false}
                depositList={recentDeposits}
                pagination={false}
              />
            </Card>
          </Col>

          {transactionList.length !== 0 && (
            <Col span={12} className="dashboard-flex-center">
              <Card className="list-card" title="Recent Transactions">
                <TransactionTable
                  transactionList={recentTransactions}
                  type={false}
                  actions={false}
                  pagination={false}
                />
              </Card>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default Dashboard;
