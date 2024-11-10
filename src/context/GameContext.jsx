import { createContext, useReducer } from "react";
import Game from "../libs/classes/Game";


const GameContext = createContext();
export default GameContext;

const initialState = new Game();

const gameReducer = (state, action) => {
   switch (action.type) {
      case 'MOVE':
         return state;
         
   
      default:
         return state;
   }
}

/* eslint-disable react/prop-types */
export const GameProvider = ({ children }) => {

   const [state, dispatch] = useReducer(gameReducer, initialState);
   console.log(state);

   return (
      <GameContext.Provider value={{ state, dispatch }}>
         
         {children}
      </GameContext.Provider>
   )
}

