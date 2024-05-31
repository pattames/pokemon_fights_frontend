import style from "../styles/NavBar.module.css";
import { default as LeaderboardImg } from "../public/leaderboard-icon.svg";
import { default as PokedexImg } from "../public/pokeball.svg";
import { default as Pokemon_home } from "../public/pokemon_home.png";
import { CiLogout } from "react-icons/ci";

function NavBar({ scrollToMyPokemon, scrollToLeaderboard }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className={style.nav}>
      <div className={style.home_img}>
        <img src={Pokemon_home} className={style.navImg} />
      </div>
      <div className={style.pokeballContainer} onClick={scrollToMyPokemon}>
        <img src={PokedexImg} className={style.pokeball} />
      </div>
      <div className={style.nav_container} onClick={scrollToLeaderboard}>
        <img src={LeaderboardImg} className={style.navImg} />
      </div>
      <div className={style.logout_container_2} onClick={handleLogout}>
        <CiLogout className={style.icon} size={40} />
        <p className={style.para}>Logout</p>
      </div>
    </nav>
  );
}
export default NavBar;
