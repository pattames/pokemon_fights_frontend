import { useContext, useState, useEffect } from 'react';
import '../styles/StyleOnePokemon.css';
import { DataContext } from '../context/DataContext';

export default function OnePokemon() {
  const { pokemon, loading } = useContext(DataContext); //GPTTTT
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchPokemonDetails = async (pokemonId) => {
    if (!pokemonId) return; // IF NO POKEMON SELECTED no Pokemon selected

    const response = await fetch(`http://localhost:8080/pokemon/${pokemonId}`);
    const data = await response.json();
    setSelectedPokemon(data); // Update selectedPokemon state. TRY WITH ONCLIK MAYBE ?????
  };

  useEffect(() => {
    if (selectedPokemonId) {
      fetchPokemonDetails(selectedPokemonId);
    }
  }, [selectedPokemonId]);



  return (
    <div className="card">
      <h2>This is One Pokemon component</h2>
      <select value={selectedPokemonId} onChange={(event) => setSelectedPokemonId(event.target.value)}>
        <option value="">Select a Pokemon</option>
        {pokemon.map((poke) => (
          <option key={poke.id} value={poke.id}>
            {poke.name.english}
          </option>
        ))}
      </select>
      {loading && <p>Loading Pokemon...</p>}
      {selectedPokemon && ( // Conditionally render details GPTTTTTTTTTTTT
        <>
          <h2>Pokemon name: {selectedPokemon.name.english}</h2>
          <h2>ID: {selectedPokemon.id}</h2>
          <img
            src={`https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/${selectedPokemon.id}.png`}
            alt={`Pokemon ${selectedPokemon.name.english}`}
          />
          {/* ... render other details as needed ... */}
        </>
      )}
      {!selectedPokemon && !loading && <p>Select a Pokemon to view details.</p>}
    </div>
  );
}