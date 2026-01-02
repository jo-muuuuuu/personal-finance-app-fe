import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axiosInstance from "../../../api/index";

import { Card } from "antd";

const LineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/monthly-summary`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Income", "Expense"],
      top: 30,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.month),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Income",
        type: "line",
        smooth: true,
        areaStyle: { color: "#a5d6a7" },
        itemStyle: { color: "#3f8600" },
        data: data.map((item) => item.total_income),
      },
      {
        name: "Expense",
        type: "line",
        smooth: true,
        areaStyle: { color: "#ef9a9a" },
        itemStyle: { color: "#cf1322" },
        data: data.map((item) => item.total_expense),
      },
    ],
  };

  return (
    <Card className="chart-card" title="Monthly Income and Expense Trend">
      <ReactECharts className="finance-echarts" option={option} />
    </Card>
  );
};

export default LineChart;
