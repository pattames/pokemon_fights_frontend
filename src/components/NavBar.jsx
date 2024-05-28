import { useTheme } from "../context/ThemeContext";
import style from "../styles/NavBar.module.css";
import { default as LeaderboardImg } from "../public/leaderboard-icon.svg";
import { default as PokedexImg } from "../public/pokeball.svg";
import { default as Pokemon_home } from "../public/pokemon_home.png";
import { default as LogoutImg } from "../public/icons8-logout-64.png";
import { CiLogout } from "react-icons/ci";

function NavBar({ scrollToMyPokemon, scrollToLeaderboard }) {
  const { theme, toggleTheme } = useTheme(); // Use theme and toggleTheme from context
  const Mode = theme === "dark" ? "\u2600" : "\u263E"; // Determine icon based on current theme

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className={style.nav}>
      <div>
        <img src={Pokemon_home} className={style.navImg} />
      </div>
      <div className={style.pokeballContainer} onClick={scrollToMyPokemon}>
        <img src={PokedexImg} className={style.pokeball} />
      </div>
      <div className={style.nav_container} onClick={scrollToLeaderboard}>
        <img src={LeaderboardImg} className={style.navImg} />
      </div>
      <div className={style.mode_container}>
        {/* <button onClick={toggleTheme}className={style.darkMode}>{Mode}</button> */}
      </div>
      {/* <div className={style.logout_container}>
        <button onClick={handleLogout} className={style.logoutButton}>
          <img className={style.logoutImg} src={LogoutImg} />
        </button>
      </div> */}
      <div className={style.logout_container_2} onClick={handleLogout}>
        <CiLogout className={style.icon} size={40} />
        <p className={style.para}>Logout</p>
      </div>
    </nav>
  );
}
export default NavBar;
