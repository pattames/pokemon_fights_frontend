import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  //   const [message, setMessage] = useState("Hello");
  const [pokemon, setPokemon] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const getPokemons = async () => {
    //APIs
    const productionAPI = "http://localhost:8080/pokemon";
    const API = "https://pokemon-fight-backend-r6vc.onrender.com/pokemon";

    const res = await fetch(API);
    const data = await res.json();
    // console.log(data.data);
    setPokemon(data.data);
  };

  const getUsers = async () => {
    //APIs
    const productionAPI = "http://localhost:8080/users";
    const API = "https://pokemon-fight-backend-r6vc.onrender.com/users";

    const res = await fetch(API);
    const data = await res.json();
    // console.log(data.data);
    setUsers(data.data);
    setLoading(false); // Set loading to false after users are fetched
  };

  useEffect(() => {
    getPokemons();
    getUsers();
    // getUser();
  }, []);

  return (
    <DataContext.Provider value={{ pokemon, users, loading }}>
      {props.children}
    </DataContext.Provider>
  );
}
