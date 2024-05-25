import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import style from "../styles/NavBar.module.css";

import { default as LeaderboardImg } from "../public/leaderboard-icon.svg";
import { default as PokedexImg } from "../public/pokeball.svg";
import { default as Pokemon_home } from "../public/pokemon_home.png";
import { default as LogoutImg } from "../public/icons8-logout-64.png";

function NavBar({ scrollToAllPokemon, scrollToLeaderboard }) {
  const { theme, toggleTheme } = useTheme(); // Use theme and toggleTheme from context
  const Mode = theme === "dark" ? "\u2600" : "\u263E"; // Determine icon based on current theme

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className={style.nav}>
      <div className={style.nav_container}>
        <NavLink to="/">
          <img src={Pokemon_home} className={style.navImg} />
        </NavLink>
      </div>
      <div className={style.pokeballContainer}>
        <button onClick={scrollToAllPokemon} className={style.button}>
          <img src={PokedexImg} className={style.pokeball} />{" "}
        </button>
      </div>
      <div className={style.nav_container}>
        <button onClick={scrollToLeaderboard} className={style.button}>
          <img src={LeaderboardImg} className={style.navImg} />
        </button>
      </div>
      <div className={style.mode_container}>
        {/* <button onClick={toggleTheme}className={style.darkMode}>{Mode}</button> */}
      </div>
      <div className={style.logout_container}>
        <button onClick={handleLogout} className={style.logoutButton}>
          <img className={style.logoutImg} src={LogoutImg} />
        </button>
      </div>
    </nav>
  );
}
export default NavBar;
