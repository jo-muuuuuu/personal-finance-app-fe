import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import axiosInstance from "../../../api";
import { useSelector } from "react-redux";

import { Card } from "antd";

const PieChart = () => {
  const userId = useSelector((state) => state.userInfo.userId);
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/category-ratio/${userId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const option = {
    // title: {
    //   text: "Expense Category Breakdown",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item",
      formatter: "{b}: ${c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      // left: "left",
      bottom: "bottom",
      data: data
        .slice(0, 5) // Only Top 5
        .map((item) => item.category || "Uncategorized"),
    },
    series: [
      {
        name: "Expense Categories",
        type: "pie",
        radius: "60%",
        data: data.map((item) => ({
          name: item.category || "Uncategorized",
          value: item.total,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
    ],
  };

  return (
    <Card className="chart-card" title="Expense Category Breakdown">
      <ReactECharts
        className="finance-echarts"
        option={option}
        // style={{ width: "40vw" }}
      />
    </Card>
  );
};

export default PieChart;
