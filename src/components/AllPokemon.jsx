import React, { useContext, useState } from "react";
import "../styles/StyleAllPokemon.css";
import { DataContext } from "../context/DataContext";
import { SelectPokeContext } from "../context/SelectPokeContext";

export default function AllPokemon() {
  const { pokemon, loading } = useContext(DataContext);
  const [randomPokemon, setRandomPokemon] = useState([]);
  //from context hook to select opponent
  const { setSelectOpponent } = useContext(SelectPokeContext);

  const handleRandom = () => {
    //randomized
    if (pokemon.length > 0) {
      // Shuffle the Pokemon array
      const shuffledPokemon = [...pokemon].sort(() => Math.random() - 0.5); //gpt
      setRandomPokemon(shuffledPokemon.slice(0, 8));
    }
  };

  //initial rendering on loadingggg
  React.useEffect(() => {
    handleRandom();
  }, [pokemon]);

  // console.log(randomPokemon);

  return (
    <div className="card--allPokemon">
      <h1>Select the Pokemon you want to catch</h1>
      <button className="allPokemon--btn" onClick={handleRandom}>
        Show me more Pokemon
      </button>
      {loading ? (
        <p>Loading Pokemon...</p>
      ) : (
        <ul className="allPokemon--list">
          {randomPokemon.map(
            (
              poke //radomize the mapping
            ) =>
              poke.image &&
              poke.base && (
                <li
                  key={poke.id}
                  className="allPOkemon--pokemonCardSmall"
                  onClick={() => setSelectOpponent(poke)}
                >
                  <div className="allPokemon--card">
                    <h3>{poke.name.english}</h3>
                    <h4>{poke.name.chinese}</h4>
                    <p>ID: {poke.id}</p>
                  </div>
                  <img
                    className="allPokemon--img"
                    src={poke.image.hires}
                    alt={`Pokemon ${poke.name.english}`}
                  />
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}
