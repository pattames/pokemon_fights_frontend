import styles from "../styles/AlertLost.module.css";

export default function AlertLost({ setAlertLost, scrollToWelcome }) {
  // const clickHandler = () => {
  //   setTimeout(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //     setAlertLost(false);
  //   }, 1000);
  // };

  const clickHandler = () => {
    setAlertLost(false);
    scrollToWelcome();
  };

  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <h3>You lose! :(</h3>
        <a onClick={clickHandler}>Try again</a>
      </div>
    </div>
  );
}
