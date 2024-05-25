import styles from "../styles/AlertWindow.module.css";

export default function AlertWindow() {
  return (
    <div className={styles.container}>
      <h3>You won! New pokemon added</h3>
      <a href="http://localhost:5174/">Show me</a>
    </div>
  );
}
