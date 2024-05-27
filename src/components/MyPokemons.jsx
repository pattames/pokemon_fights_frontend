import style from "../styles/MyPokemons.module.css";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import { SelectPokeContext } from "../context/SelectPokeContext";

function MyPokemons({
  user,
  currentUser,
  scrollToAllPokemon,
  setAlertWindow,
  setAlertLost,
}) {
  const { loading, pokemon, users } = useContext(DataContext);
  //from context hook to select poke
  const { setSelectPokemon, battleCount, selectPokemon } =
    useContext(SelectPokeContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);

  const itemsPerPage = 3;

  //Caos de paul para definir displayed pokemon
  useEffect(() => {
    if (loading || !users.length || !pokemon.length) return;

    const loggedInUser = user;
    if (!loggedInUser) return; // If no user is found, simply return.
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

  //Select pokemon handlder
  const handlePokemonSelect = (pokemon) => {
    setSelectPokemon(pokemon);
    scrollToAllPokemon();
    setAlertWindow(false);
    setAlertLost(false);
  };

  //If selectPokemon is truthy, scroll to battle
  useEffect(() => {
    if (selectPokemon) {
      setTimeout(scrollToAllPokemon, 2);
    }
  }, [selectPokemon]);

  const toggleShowAll = () => setShowAll((current) => !current); // Toggle function

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <section className={style.container}>
        <div className={style.intro}>
          <h1>Select your fighter</h1>
        </div>
        <div
          className={`${style.yourpokemons} ${showAll ? style.vertical : ""}`}
        >
          {user.pokemons.length &&
            displayedPokemons.map((pokemon, index) => (
              <div
                key={index}
                className={style.pokemonContainer}
                onClick={() => handlePokemonSelect(pokemon)}
              >
                <h3 className={style.pokemonName}>{pokemon.name}</h3>
                <div>
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
          <button onClick={toggleShowAll} className={style.toggleButton}>
            {showAll ? "Show less" : "Show all"}
          </button>{" "}
        </div>
      </section>
    </>
  );
}

export default MyPokemons;
