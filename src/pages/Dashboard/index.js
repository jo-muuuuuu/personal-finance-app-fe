import React from "react";
import { Col, Row } from "antd";

import BarChart from "../../components/ECharts/BarChart";
import LineChart from "../../components/ECharts/LineChart";
import PieChart from "../../components/ECharts/PieChart";
import TopCategoriesList from "../../components/ECharts/TopCategoriesList";

const Dashboard = () => {
  return (
    <div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
          <LineChart />
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
          <BarChart />
        </Col>
      </Row>

      <Row
        style={{
          display: "flex",
        }}
      >
        <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
          <PieChart />
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
          <TopCategoriesList />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
