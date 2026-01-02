import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

import axiosInstance from "../../../api/index";

import { Card } from "antd";

const BarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/account-books-summary`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const option = {
    // title: {
    //   text: "Account Book Income vs Expense",
    //   left: "center",
    // },
    tooltip: { trigger: "axis" },
    legend: { data: ["Income", "Expense"], top: 30 },
    xAxis: {
      type: "category",
      data: data.map((item) => item.account_book_name),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Income",
        type: "bar",
        data: data.map((item) => item.total_income),
        itemStyle: { color: "#3f8600" },
      },
      {
        name: "Expense",
        type: "bar",
        data: data.map((item) => item.total_expense),
        itemStyle: { color: "#cf1322" },
      },
    ],
  };

  return (
    <Card className="chart-card" title="Account Book Income vs Expense">
      <ReactECharts className="finance-echarts" option={option} />
    </Card>
  );
};

export default BarChart;
