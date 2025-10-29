import React from "react";
import { Layout, Button, Row, Col, Card } from "antd";
import { LinkedinFilled, GithubFilled, MailFilled } from "@ant-design/icons";

import categoriesImg from "../../assets/imgs/categories.png";
import transactionsImg from "../../assets/imgs/transactions.png";
import dashboardImg from "../../assets/imgs/dashboard.png";
import "./index.css";
import { useNavigate } from "react-router";

const { Header, Footer } = Layout;

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header className="land-header" style={{ backgroundColor: "#1677ff" }}>
        <div className="land-header-item"></div>

        <div className="land-header-item" style={{ fontSize: "1.25rem" }}>
          Johnny's Bookkeeping App
        </div>

        <div className="land-header-item">
          <span
            style={{
              marginRight: "1rem",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </span>

          <span style={{ marginRight: "1rem", cursor: "default" }}>|</span>

          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </span>
        </div>
      </Header>

      <div className="land-banner">
        <div style={{ textAlign: "center" }}>
          <h1>Your Smart Solution for Personal Finance</h1>

          <p>
            Track expenses, manage budgets, and gain insights into your spending with our
            powerful and easy-to-use Bookkeeping App.
          </p>

          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "navy", marginTop: "2.5rem" }}
            href="https://github.com/jo-muuuuuu/personal-finance-app-fe"
            target="_blank"
          >
            INTRODUCTION
          </Button>
        </div>
      </div>

      <div className="land-banner-arc">
        <div className="land-banner-arc-top"></div>
        <div className="land-banner-arc-bot"></div>
      </div>

      <div className="land-features">
        <Row gutter={64} align="middle">
          <Col span={12} align="right">
            <h3>Track Transactions</h3>
            <p>
              Effortlessly monitor all your income and expenses with a clear, detailed
              transaction list.
            </p>
          </Col>
          <Col span={12}>
            <img
              src={transactionsImg}
              alt="transactions"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
        </Row>

        <Row gutter={64} align="middle">
          <Col span={12}>
            <img
              src={categoriesImg}
              alt="categories"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
          <Col span={12}>
            <h3>Smart Categories</h3>
            <p>
              Easily organize your spending into categories and gain insights into your
              financial habits.
            </p>
          </Col>
        </Row>

        <Row gutter={64} align="middle">
          <Col span={12} align="right">
            <h3>Data Visualization</h3>
            <p>
              Understand your finances at a glance with intuitive charts that show income,
              expenses, and budget trends.
            </p>
          </Col>
          <Col span={12}>
            <img
              src={dashboardImg}
              alt="dashboard"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Col>
        </Row>
      </div>

      <Card className="land-card">
        <h1 style={{ color: "navy" }}>Elevate Your Financial Journey</h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          Our app simplifies expense tracking and empowers you to make better financial
          decisions.
        </p>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: "navy", marginTop: "1rem", fontWeight: "bold" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          GET STARTED
        </Button>
      </Card>

      <Footer className="land-footer">
        <div className="land-footer-arc-top"></div>

        <div className="land-footer-arc-bot">
          <h2>Contact Me</h2>
          <div className="land-footer-contact">
            <div className="land-footer-contact-item">
              <MailFilled />
              <p>johnnymu0809@gmail.com</p>
            </div>

            <div className="land-footer-contact-item">
              <LinkedinFilled />
              <a
                href="https://www.linkedin.com/in/zicheng-mu/"
                target="_blank"
                rel="noreferrer"
              >
                https://www.linkedin.com/in/zicheng-mu/
              </a>
            </div>

            <div className="land-footer-contact-item">
              <GithubFilled />
              <a href="https://github.com/jo-muuuuuu/" target="_blank" rel="noreferrer">
                https://github.com/jo-muuuuuu/
              </a>
            </div>
          </div>

          <hr className="land-footer-divider" />

          <div className="land-footer-copy">
            <div style={{ lineHeight: "60px" }}>
              Johnny's Bookkeeping App ©{new Date().getFullYear()} | Created by Zicheng Mu
            </div>
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default Landing;
