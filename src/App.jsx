import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import style from "./styles/Auth.module.css";
import { AuthContext } from "./context/authContext";
import MyPokemons from "./components/MyPokemons";
import MainContent from "./components/MainContent";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Battle from "./components/Battle";
import AllPokemon from "./components/AllPokemon";
import Leaderboard from "./components/Leaderboard";
import { SelectPokeContext } from "./context/SelectPokeContext";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [alertWindow, setAlertWindow] = useState(false);
  const [alertLost, setAlertLost] = useState(false);
  //to scroll:
  const allPokemonsRef = useRef(null);
  const leaderboardRef = useRef(null);
  const battleRef = useRef(null);
  const myPokemonRef = useRef(null);
  //Register or log in
  const [register, setRegister] = useState(true);

  const { battleCount } = useContext(SelectPokeContext);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    const userData = localStorage.getItem("user");
    if (userData && user) {
      setAuthenticated(true);
    }
  }, [user]);

  const handleAuthenticate = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // setAuthenticated(true);
  };

  console.log(authenticated);

  return (
    <Routes>
      <Route
        path="/landing"
        element={
          authenticated ? (
            <>
              <NavBar
                scrollToMyPokemon={() =>
                  myPokemonRef.current.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                scrollToLeaderboard={() =>
                  leaderboardRef.current.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              />
              <MainContent username={user?.username} />
              {user && (
                <div ref={myPokemonRef}>
                  <MyPokemons
                    key={battleCount}
                    user={user}
                    currentUser={user?.username}
                    scrollToAllPokemon={() =>
                      allPokemonsRef.current.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    setAlertWindow={setAlertWindow}
                    setAlertLost={setAlertLost}
                  />
                </div>
              )}
              <div ref={allPokemonsRef}>
                <AllPokemon
                  scrollToBattle={() =>
                    battleRef.current.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                />
              </div>
              <div ref={battleRef}>
                <Battle
                  user={user}
                  setUser={setUser}
                  scrollToTopPage={() =>
                    topPageRef.current.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  alertWindow={alertWindow}
                  setAlertWindow={setAlertWindow}
                  alertLost={alertLost}
                  setAlertLost={setAlertLost}
                />
              </div>
              <div ref={leaderboardRef}>
                <Leaderboard />
              </div>
            </>
          ) : (
            <Navigate to={"/"} />
          )
        }
      />
      <Route
        path="/"
        element={
          !authenticated ? (
            <>
              <div className={style.authContainer}>
                <img
                  src="src/public/pokemon.svg"
                  alt="pokemon logo"
                  className={style.logo}
                />
                {register ? (
                  <div>
                    <Signup setUser={setUser} />
                    <p className={style.message}>
                      Already have an account?{" "}
                      <span
                        className={style.message_span}
                        onClick={() => setRegister(false)}
                      >
                        Log In
                      </span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <Login
                      setUser={setUser}
                      onAuthenticate={handleAuthenticate}
                    />
                    <p className={style.message}>
                      Don't have an account?{" "}
                      <span
                        className={style.message_span}
                        onClick={() => setRegister(true)}
                      >
                        Register
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            user && <Navigate to={"/landing"} />
          )
        }
      />
    </Routes>
  );
}

export default App;
