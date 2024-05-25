import { useState, useEffect } from "react";

import style from "../styles/Signup.module.css";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8080/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
      setUsername("");
      setPassword("");
    }

    if (response.ok) {
      console.log("RESPONSE WAS OK");
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsLoading(false);
      setUsername("");
      setPassword("");
      // alert("User created. Please log in");
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h3 className={style.title}>Signup</h3>
        <div className={style.inputContainer}>
          <label className={style.label}>username:</label>
          <input
            className={`${style.usernameInput} ${style.input}`}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={style.inputContainer}>
          <label className={style.label}>password:</label>
          <input
            className={`${style.passwordInput} ${style.input}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={style.button}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
