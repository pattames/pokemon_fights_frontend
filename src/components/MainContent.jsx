import React from "react";

const MainContent = ({ username }) => {
  return (
    <div
      style={{
        textAlign: "center",
        marginBlockStart: "0",
        fontSize: "1.5rem",
      }}
    >
      <h2>
        Welcome, <span style={{ color: "green" }}>{username}</span>!
      </h2>
    </div>
  );
};

export default MainContent;
