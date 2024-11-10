import { useContext } from "react";
import GameContext from "../context/GameContext";


const useGameState = () => {
   const context = useContext(GameContext);
   return context;
}

export default useGameState