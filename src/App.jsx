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

  const { battleCount } = useContext(SelectPokeContext);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    const userData = localStorage.getItem("user");
    if (userData && user && user.pokemons.length) {
      setAuthenticated(true);
    }
  }, [user]);

  const handleAuthenticate = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // setAuthenticated(true);
  };

  return (
    <Routes>
      <Route
        path="/"
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
              {user && user.pokemons.length && (
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
            <Navigate to={"/login_signup"} />
          )
        }
      />
      <Route
        path="/login_signup"
        element={
          !authenticated ? (
            <>
              <div className={style.authContainer}>
                <Login setUser={setUser} onAuthenticate={handleAuthenticate} />
                <Signup setUser={setUser} />
              </div>
            </>
          ) : (
            user && user.pokemons.length && <Navigate to={"/"} />
          )
        }
      />
    </Routes>
  );
}

export default App;
