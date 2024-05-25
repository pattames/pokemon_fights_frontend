import { useState, useEffect, useContext, useRef } from "react";

import style from "../styles/Auth.module.css";

import { AuthContext } from "../context/authContext";

import MyPokemons from "./MyPokemons";
import MainContent from "./MainContent";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import Battle from "./Battle";
import AllPokemon from "./AllPokemon";
import Leaderboard from "./Leaderboard";

import { SelectPokeContext } from "../context/SelectPokeContext";

import Authentication from "./Authentification";

function Landing() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const allPokemonsRef = useRef(null);
  const leaderboardRef = useRef(null);
  const [render, setRender] = useState(false);

  const { battleCount } = useContext(SelectPokeContext);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    const userData = localStorage.getItem("user");
    if (userData) {
      setAuthenticated(true);
    }
  }, [user]);

  const handleAuthenticate = (username) => {
    setAuthenticated(true);
    setUsername(username);
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      setRender(true);
      console.log(render);
    }
  }, [authenticated]);

  return (
    <>
      {authenticated ? (
        <>
          <NavBar
            scrollToAllPokemon={() =>
              allPokemonsRef.current.scrollIntoView({ behavior: "smooth" })
            }
            scrollToLeaderboard={() =>
              leaderboardRef.current.scrollIntoView({ behavior: "smooth" })
            }
          />
          <MainContent username={user.username} />
          <MyPokemons key={battleCount} currentUser={user.username} />
          <div ref={allPokemonsRef}>
            <AllPokemon />
          </div>
          <Battle user={user} setUser={setUser} />
          <div ref={leaderboardRef}>
            <Leaderboard />
          </div>
        </>
      ) : (
        <>
          {/* <Authentication onAuthenticate={handleAuthenticate} /> */}
          <div className={style.authContainer}>
            <Login setUser={setUser} onAuthenticate={handleAuthenticate} />
            <Signup setUser={setUser} />
          </div>
        </>
      )}
    </>
  );
}

export default Landing;
