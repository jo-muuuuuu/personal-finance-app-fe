import React, { useEffect, useState } from "react";
import { List, Card } from "antd";
import axiosInstance from "../../../api";
import { useSelector } from "react-redux";

const TopCategoriesList = () => {
  const userId = useSelector((state) => state.userInfo.userId);
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/top-categories/${userId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <Card className="list-card" title="Top 5 Expense Categories">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={
                <span>
                  {index + 1}. {item.category || "Uncategorized"}
                </span>
              }
            />
            <div style={{ fontWeight: 500 }}>${Number(item.total).toFixed(2)}</div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TopCategoriesList;
