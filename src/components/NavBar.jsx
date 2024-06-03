import style from "../styles/NavBar.module.css";
import { CiLogout } from "react-icons/ci";

function NavBar({ scrollToMyPokemon, scrollToLeaderboard }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className={style.nav}>
      <div className={style.home_img}>
        <img src="pokemon_home.png" className={style.navImg} />
      </div>
      <div className={style.pokeballContainer} onClick={scrollToMyPokemon}>
        <img src="pokeball.svg" className={style.pokeball} />
      </div>
      <div className={style.nav_container} onClick={scrollToLeaderboard}>
        <img src="leaderboard-icon.svg" className={style.navImg} />
      </div>
      <div className={style.logout_container_2} onClick={handleLogout}>
        <CiLogout className={style.icon} size={40} />
        <p className={style.para}>Logout</p>
      </div>
    </nav>
  );
}
export default NavBar;
