import { useContext, useState, useEffect } from "react";
import { SelectPokeContext } from "../context/SelectPokeContext";

function GoodPokemon () {

const { selectPokemon } = useContext(SelectPokeContext);

useEffect(() => {
    console.log(selectPokemon)
}, [selectPokemon]);
    return (
        <div>
            <h1>Your Pokemon</h1>
            {selectPokemon && (
                <div>
                    <h1>{selectPokemon.name.english}</h1>
                    <p>Attack: {selectPokemon.base.Attack}</p>
                    <p>Defense: {selectPokemon.base.Defense}</p>
                    <p>Sp. Attack: {selectPokemon.base["Sp. Attack"]}</p>
                    <p>Sp. Defense: {selectPokemon.base["Sp. Defense"]}</p>
                    <p>Speed: {selectPokemon.base.Speed}</p>
                </div>
            )}
        </div>
    );
}

export default GoodPokemon;