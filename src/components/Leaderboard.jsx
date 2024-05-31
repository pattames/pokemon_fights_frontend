import style from "../styles/Leaderboard.module.css";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Leaderboard() {
  const { users } = useContext(DataContext);

  // Sort users by the number of pokemons they have in descending order
  // Ensure sorting happens after users are fetched from the context
  const sortedUsers = users
    .sort((a, b) => b.pokemons.length - a.pokemons.length)
    .slice(0, 5);

  return (
    <section className={style.container}>
      <h2 className={style.title}>Leaderboard</h2>
      <div className={style.headers}>
        <h3 className={style.header}>Trainer</h3>
        <h3 className={style.header}>Pokemon</h3>
      </div>
      {sortedUsers.length > 0 ? (
        sortedUsers.map((user, index) => (
          <div key={index} className={style.userContainer}>
            <div>
              <h3 className={style.userName}>{user.username}</h3>
            </div>
            <div>
              <p className={style.pokemonsTotal}> {user.pokemons.length}</p>
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </section>
  );
}

export default Leaderboard;
