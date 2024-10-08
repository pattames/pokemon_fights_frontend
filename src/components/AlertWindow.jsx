import styles from "../styles/AlertWindow.module.css";

export default function AlertWindow({ setAlertWindow, scrollToWelcome }) {
  // const clickHandler = () => {
  //   setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //     setAlertWindow(false);
  //   }, 1000);
  // };

  const clickHandler = () => {
    setAlertWindow(false);
    scrollToWelcome();
  };
  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <h3>You won! New pokemon added</h3>
        <a onClick={clickHandler}>Show me</a>
      </div>
    </div>
  );
}
