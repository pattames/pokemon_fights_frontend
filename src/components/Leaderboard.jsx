import style from "../styles/Leaderboard.module.css";
import { useState, useContext, useEffect } from "react";
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
      {/* <p>Here you will see the top 10 trainers</p> */}
      <div className={style.headers}>
        <h3 className={style.header}>Trainer</h3>
        <h3 className={style.header}>Pokemon</h3>
        {/* <h3 className={style.header}>Score</h3>
        <h3 className={style.header}>W/R</h3> */}
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
            {/* <div>
              <p className={style.score}>Score Placeholder</p>
            </div> */}
            {/* <div>
              <p className={style.winRation}>W/R Placeholder</p>
            </div> */}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
      {/* <div className={style.pagination}>
          <button className={style.pagButton}>Previous</button>
          <button className={style.pagButton}>Next</button>
        </div> */}
    </section>
  );
}

export default Leaderboard;
