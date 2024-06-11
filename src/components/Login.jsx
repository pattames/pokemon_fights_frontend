import { useState, useEffect } from "react";
import style from "../styles/Login.module.css";
import { MoonLoader } from "react-spinners";

export default function Login({
  onAuthenticate,
  isLoading,
  setIsLoading,
  setUser,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [storedUser, setStoredUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObj = JSON.parse(userData);
      setStoredUser(userObj.username);
    }
  }, []);

  const handleAutoFill = async (e) => {
    e.preventDefault();
    setUsername(storedUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    //APIs
    const productionAPI = "http://localhost:8080/users/login";
    const API = "https://pokemon-fight-backend-r6vc.onrender.com/users/login";

    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsLoading(false);
      onAuthenticate(username);
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h3 className={style.title}>Log In!</h3>
        {isLoading ? (
          <MoonLoader
            cssOverride={{ margin: "0 auto", padding: "5px" }}
            size={90}
          />
        ) : (
          <div className={style.inputContainer}>
            <input
              className={`${style.usernameInput} ${style.input}`}
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {storedUser && (
              <button className={style.autofill} onClick={handleAutoFill}>
                Auto-fill
              </button>
            )}
            <input
              className={`${style.passwordInput} ${style.input}`}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {error && (
          <div className="error" style={{ color: "red" }}>
            {error}
          </div>
        )}
        <button
          className={style.button}
          disabled={isLoading}
          style={{
            transform: isLoading && "none",
            cursor: isLoading && "wait",
          }}
        >
          {isLoading ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
