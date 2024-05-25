import style from "../styles/MyPokemons.module.css";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { SelectPokeContext } from "../context/SelectPokeContext";

function MyPokemons({ currentUser }) {
  const { loading, pokemon, users } = useContext(DataContext);
  //from context hook to select poke
  const { setSelectPokemon, battleCount } = useContext(SelectPokeContext);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const [showAll, setShowAll] = useState(false); // New state for toggle

  // Derived states for UI
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  const pokemonTypes = {
    Normal: "#A8A77A",
    Fire: "#EE8130",
    Water: "#6390F0",
    Electric: "#F7D02C",
    Grass: "#7AC74C",
    Ice: "#96D9D6",
    Fighting: "#C22E28",
    Poison: "#A33EA1",
    Ground: "#E2BF65",
    Flying: "#A98FF3",
    Psychic: "#F95587",
    Bug: "#A6B91A",
    Rock: "#B6A136",
    Ghost: "#735797",
    Dragon: "#6F35FC",
    Dark: "#705746",
    Steel: "#B7B7CE",
    Fairy: "#D685AD",
  };

  useEffect(() => {
    const loggedInUser = users.find((user) => user.username === currentUser);
    if (!loggedInUser) return; // If no user is found, simply return.
    // console.log(loggedInUser)
    const reversedPokemons = [...loggedInUser.pokemons].reverse();

    let pokemonsToDisplay;
    if (showAll) {
      pokemonsToDisplay = reversedPokemons.map((id) => ({
        name: pokemon[id - 1].name.english,
        image: pokemon[id - 1].image.hires,
        namejapanese: pokemon[id - 1].name.japanese,
        type: pokemon[id - 1].type,
        base: {
          Attack: pokemon[id - 1].base.Attack,
          Defense: pokemon[id - 1].base.Defense,
          "Sp. Attack": pokemon[id - 1].base["Sp. Attack"],
          "Sp. Defense": pokemon[id - 1].base["Sp. Defense"],
          Speed: pokemon[id - 1].base.Speed,
        },
      }));
    } else {
      const start = currentPage * itemsPerPage;
      const end = start + itemsPerPage;
      pokemonsToDisplay = reversedPokemons.slice(start, end).map((id) => ({
        name: pokemon[id - 1].name.english,
        image: pokemon[id - 1].image.hires,
        namejapanese: pokemon[id - 1].name.japanese,
        type: pokemon[id - 1].type,
        base: {
          Attack: pokemon[id - 1].base.Attack,
          Defense: pokemon[id - 1].base.Defense,
          "Sp. Attack": pokemon[id - 1].base["Sp. Attack"],
          "Sp. Defense": pokemon[id - 1].base["Sp. Defense"],
          Speed: pokemon[id - 1].base.Speed,
        },
      }));
    }

    setDisplayedPokemons(pokemonsToDisplay);
    // console.log(pokemon)
  }, [users, pokemon, currentPage, showAll, loading, currentUser, battleCount]);

  const nextPage = () =>
    setCurrentPage((current) =>
      Math.min(
        current + 1,
        Math.ceil(displayedPokemons.length / itemsPerPage) - 1
      )
    );
  const prevPage = () => setCurrentPage((current) => Math.max(current - 1, 0));
  const toggleShowAll = () => setShowAll((current) => !current); // Toggle function

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <section className={style.container}>
        <div className={style.intro}>
          <h1>Select your fighter</h1>
          {/* <p className={style.counterP}>
            You've catched:
            <span className={style.counter}>
              {" "}
              {displayedPokemons.length} Pokemon
            </span>
          </p> */}
        </div>
        <div
          className={`${style.yourpokemons} ${showAll ? style.vertical : ""}`}
        >
          {" "}
          {/* Apply vertical class if showAll is true */}
          {displayedPokemons.map((pokemon, index) => (
            <div
              key={index}
              className={style.pokemonContainer}
              onClick={() => setSelectPokemon(pokemon)}
            >
              <h3 className={style.pokemonName}>{pokemon.name}</h3>
              <div>
                {/* <div style={{ backgroundColor: pokemonTypes[pokemon.type[0]] }}> */}
                <img
                  className={style.pokemonImage}
                  src={pokemon.image}
                  alt={pokemon.name}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={style.yourPokemonsPag}>
          {/* <button
            onClick={prevPage}
            disabled={currentPage <= 0 || showAll}
            className={style.pagButton}
          >
            Previous
          </button> */}
          {/* <button
            onClick={nextPage}
            disabled={
              (currentPage + 1) * itemsPerPage >= displayedPokemons.length ||
              showAll
            }
            className={style.pagButton}
          >
            Next
          </button> */}
          <button onClick={toggleShowAll} className={style.toggleButton}>
            {showAll ? "Show less" : "Show all"}
          </button>{" "}
          {/* Toggle button */}
        </div>
      </section>
    </>
  );
}

export default MyPokemons;
