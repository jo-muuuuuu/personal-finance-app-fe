import React, { useState } from "react";
import { Row, Col, Divider } from "antd";
import "./index.css";

const CategoryGrid = ({ expenses, incomes, onSelect, type, selected }) => {
  const [selectedCategory, setSelectedCategory] = useState(selected);
  // console.log(select);
  const handleSelect = (name) => {
    setSelectedCategory(name);
    onSelect(name);
  };

  return (
    <>
      <h3 className="form-header-middle">Select Category</h3>
      <Divider />

      {type === "income" ? (
        <>
          {/* <h4 className="form-header-middle"> Income</h4> */}
          <Row justify="space-evenly" style={{ padding: "20px", textAlign: "center" }}>
            {incomes.map((category) => (
              <Col
                key={category.id}
                span={6}
                className="category-grid-item"
                onClick={() => handleSelect(category.name)}
                style={{
                  border:
                    selectedCategory === category.name ? "1px solid #1677ff" : "none",
                }}
              >
                <div className="category-grid-svg">{category.icon}</div>
                <div style={{ marginTop: "8px" }}>{category.name}</div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          {/* <h4 className="form-header-middle"> Expense</h4> */}
          <Row justify="space-evenly" style={{ padding: "20px", textAlign: "center" }}>
            {expenses.map((category) => (
              <Col
                key={category.id}
                span={6}
                className="category-grid-item"
                onClick={() => handleSelect(category.name)}
                style={{
                  border:
                    selectedCategory === category.name ? "1px solid #1677ff" : "none",
                }}
              >
                <div className="category-grid-svg">{category.icon}</div>
                <div style={{ marginTop: "8px" }}>{category.name}</div>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default CategoryGrid;
