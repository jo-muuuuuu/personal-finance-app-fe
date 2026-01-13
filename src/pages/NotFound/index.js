import React from "react";
import NotFoundImg from "../../assets/imgs/404.png";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginTop: "5rem" }}>404 </h1>
      <h2>Page Not Found</h2>
      <img
        src={NotFoundImg}
        alt="404 Not Found"
        style={{ width: "500px", marginTop: "2rem" }}
      />
    </div>
  );
};

export default NotFound;
