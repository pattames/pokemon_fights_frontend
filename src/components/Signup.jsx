import { useState, useEffect } from "react";
import { useReducer } from "react";

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

    //APIs
    const productionAPI = "http://localhost:8080/users/signup";
    const API = "https://pokemon-fight-backend-al3u.onrender.com/users/signup";

    const response = await fetch(API, {
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
      return;
    }

    console.log("RESPONSE WAS OK");
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    setIsLoading(false);
    setUsername("");
    setPassword("");

    console.log(data);
    // alert("User created. Please log in");
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h3 className={style.title}>Register!</h3>
        <div className={style.inputContainer}>
          {/* <label className={style.label}>Username:</label> */}
          <input
            className={`${style.usernameInput} ${style.input}`}
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <label className={style.label}>password:</label> */}
          <input
            className={`${style.passwordInput} ${style.input}`}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={style.button} disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
