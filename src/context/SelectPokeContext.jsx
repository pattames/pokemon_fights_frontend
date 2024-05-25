import { createContext, useState } from "react";

export const SelectPokeContext = createContext();

export default function SelectPokeContextProvider(props) {
  const [selectPokemon, setSelectPokemon] = useState(null);
  const [selectOpponent, setSelectOpponent] = useState(null);

  const [battleCount, setBattleCount] = useState(0);

  return (
    <SelectPokeContext.Provider
      value={{
        selectPokemon,
        setSelectPokemon,
        selectOpponent,
        setSelectOpponent,
        battleCount,
        setBattleCount,
      }}
    >
      {props.children}
    </SelectPokeContext.Provider>
  );
}
