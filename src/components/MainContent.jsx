import React from "react";
import styles from "../styles/MainContent.module.css";

const MainContent = ({ username }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>
        Welcome, <span style={{ color: "green" }}>{username}</span>!
      </h2>
    </div>
  );
};

export default MainContent;
