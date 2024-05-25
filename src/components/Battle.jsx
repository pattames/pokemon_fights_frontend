import { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import styles from "../styles/Battle.module.css";
import { SelectPokeContext } from "../context/SelectPokeContext";

import GoodPokemon from "./GoodPokemon";
import BadPokemon from "./BadPokemon";
import AlertWindow from "./AlertWindow";

function Battle() {
  //Data
  const { pokemon, loading } = useContext(DataContext);
  //from context hook to select poke
  const { selectPokemon, selectOpponent, setBattleCount } =
    useContext(SelectPokeContext);
  //Hard coded pokemon (demo)
  // const ivysaur = pokemon[0];
  // const charmander = pokemon[3];
  //Dynamic pokemon
  const [userPokemon, setUserPokemon] = useState(null);
  const [opponentPokemon, setOpponentPokemon] = useState(null);
  //HP counters
  const [userCount, setUserCount] = useState(5);
  const [opponentCount, setOpponentCount] = useState(5);
  //Battle colors
  const [attackColor, setAttackColor] = useState();
  const [defenseColor, setDefenseColor] = useState();
  const [spAttackColor, setSpAttackColor] = useState();
  const [spDefenseColor, setSpDefenseColor] = useState();
  const [speedColor, setSpeedColor] = useState();
  //Number of rounds tracker
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  //User
  const [user, setUser] = useState(null);
  //Alert window
  const [alertWindow, setAlertWindow] = useState(false);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  //Set user pokemon
  useEffect(() => {
    if (selectPokemon) {
      setUserPokemon(selectPokemon);
    }
  }, [selectPokemon]);

  //Set opponent pokemon
  useEffect(() => {
    if (selectOpponent) {
      setOpponentPokemon(selectOpponent);
    }
  }, [selectOpponent]);

  //Handle click (battle rounds & winner)
  function handleClick() {
    //If userpokemon attack > opponentpokemon attack setUserCount (count - 1)
    function attackRound() {
      if (userPokemon.base.Attack >= opponentPokemon.base.Attack) {
        setOpponentCount((prevOpponentCount) => prevOpponentCount - 1);
        setAttackColor("green");
      } else {
        setUserCount((prevUserCount) => prevUserCount - 1);
        //red background for style.base
        setAttackColor("red");
      }
      //Completed round track
      setRoundsCompleted((prevValue) => prevValue + 1);
    }
    attackRound();
    //Same but for defense + 1sec delay
    function defenseRound() {
      setTimeout(() => {
        if (userPokemon.base.Defense >= opponentPokemon.base.Defense) {
          setOpponentCount((prevOpponentCount) => prevOpponentCount - 1);
          setDefenseColor("green");
        } else {
          setUserCount((prevUserCount) => prevUserCount - 1);
          setDefenseColor("red");
        }
        setRoundsCompleted((prevValue) => prevValue + 1);
      }, 1000);
    }
    defenseRound();
    //Same but for Sp Attack +2sec delay
    function spAttackRound() {
      setTimeout(() => {
        if (
          userPokemon.base["Sp. Attack"] >= opponentPokemon.base["Sp. Attack"]
        ) {
          setOpponentCount((prevOpponentCount) => prevOpponentCount - 1);
          setSpAttackColor("green");
        } else {
          setUserCount((prevUserCount) => prevUserCount - 1);
          setSpAttackColor("red");
        }
        setRoundsCompleted((prevValue) => prevValue + 1);
      }, 2000);
    }
    spAttackRound();
    //Same but for Sp Defense +3sec delay
    function spDefenseRound() {
      setTimeout(() => {
        if (
          userPokemon.base["Sp. Defense"] >= opponentPokemon.base["Sp. Defense"]
        ) {
          setOpponentCount((prevOpponentCount) => prevOpponentCount - 1);
          setSpDefenseColor("green");
        } else {
          setUserCount((prevUserCount) => prevUserCount - 1);
          setSpDefenseColor("red");
        }
        setRoundsCompleted((prevValue) => prevValue + 1);
      }, 3000);
    }
    spDefenseRound();
    //Same but for Speed +4sec delay
    function speedRound() {
      setTimeout(() => {
        if (userPokemon.base.Speed >= opponentPokemon.base.Speed) {
          setOpponentCount((prevOpponentCount) => prevOpponentCount - 1);
          setSpeedColor("green");
        } else {
          setUserCount((prevUserCount) => prevUserCount - 1);
          setSpeedColor("red");
        }
        setRoundsCompleted((prevValue) => prevValue + 1);
      }, 4000);
    }
    speedRound();
  }

  //Update the user in database
  const updateUser = async (updatedUser) => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${updatedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user pokemons");
      }

      const data = await response.json();
      console.log("Successfully updated user pokemons:", data);
      // Optionally, update the user state or context here if necessary
    } catch (error) {
      console.error("Error updating user pokemons:", error);
    }
  };

  //If rounds completed === 5:
  //If (userCounter > opponentCounter), user wins
  //Else, user looses
  useEffect(() => {
    if (roundsCompleted === 5) {
      setTimeout(() => {
        if (userCount > opponentCount) {
          // If user.pokemons is an array and doesn't already contain the opponent's ID
          if (!user.pokemons.includes(String(opponentPokemon.id))) {
            //Update user with new pokemon
            const updatedUser = {
              ...user,
              pokemons: [...user.pokemons, String(opponentPokemon.id)],
            };
            setUser(updatedUser);
            // Call updateUser function to update the user's pokemons on the server
            updateUser(updatedUser);
            setUserPokemon(false);
            setOpponentPokemon(false);
            // alert("You win! New pokemon added");
            setAlertWindow(true);
          }
        } else {
          alert("You lose :(");
        }
        // Reset rounds for next battle
        setRoundsCompleted(0);
        //Reset counters
        setUserCount(5);
        setOpponentCount(5);
        //Reset colors
        setAttackColor(null);
        setDefenseColor(null);
        setSpAttackColor(null);
        setSpDefenseColor(null);
        setSpeedColor(null);
        //Battle count +1
        setBattleCount((prevCount) => prevCount + 1);
      }, 100);
    }
  }, [roundsCompleted, userCount, opponentCount, user, setUser]);

  //data check without repetitions
  // useEffect(() => {
  //   if (!loading) {
  //     console.log("Data in battle component:", userCount);
  //   }
  // }, [userPokemon, opponentPokemon, loading, user]);

  return (
    <>
      <div className={styles.masterContainer}>
        <div className={styles.battle_container}>
          {userPokemon && opponentPokemon && (
            <div className={styles.battle_component}>
              <h1 className={styles.title}>Battlefield</h1>
              <div className={styles.battle_container}>
                <div className={styles.pokemon_box}>
                  <h3>HP: {userCount}/5</h3>
                  <h2>{userPokemon && userPokemon.namejapanese}</h2>
                  <img
                    src={userPokemon && userPokemon.image}
                    alt="user pokemon"
                  />
                </div>
                <div className={styles.scoreboard}>
                  <div
                    className={styles.base}
                    style={{ background: attackColor }}
                  >
                    Attack
                  </div>
                  <div
                    className={styles.base}
                    style={{ background: defenseColor }}
                  >
                    Defense
                  </div>
                  <div
                    className={styles.base}
                    style={{ background: spAttackColor }}
                  >
                    Sp. Attack
                  </div>
                  <div
                    className={styles.base}
                    style={{ background: spDefenseColor }}
                  >
                    Sp. Defense
                  </div>
                  <div
                    className={styles.base}
                    style={{ background: speedColor }}
                  >
                    Speed
                  </div>
                </div>
                <div className={styles.pokemon_box}>
                  <h3>HP: {opponentCount}/5</h3>
                  <h2>{opponentPokemon && opponentPokemon.name.japanese}</h2>
                  <img
                    src={opponentPokemon && opponentPokemon.image.hires}
                    alt="opponent pokemon"
                  />
                </div>
              </div>
              <div className={styles.btn_container}>
                <button className={styles.fight_btn} onClick={handleClick}>
                  Fight!
                </button>
              </div>
            </div>
          )}
        </div>
        {alertWindow && <AlertWindow />}
      </div>
    </>
  );
}

export default Battle;
