import styles from "../styles/AlertLost.module.css";

export default function AlertLost({ setAlertLost }) {
  const clickHandler = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setAlertLost(false);
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
