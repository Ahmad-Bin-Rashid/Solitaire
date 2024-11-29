import { createContext, useReducer } from "react";
import Game from "../libs/classes/Game";


const GameContext = createContext();
export default GameContext;

const initialState = {
   game: new Game(),
   history: [],
   future: []
};

const gameReducer = (state, action) => {
   const { game, history, future } = state;

   switch (action.type) {
      case 'PUSH_STATE':
         return {
            game: action.payload,
            history: [...history, game],
            future: [] // Clear redo history on new move
         };

      case 'UNDO':
         if (history.length === 0) return state;
         const previous = history[history.length - 1];
         const newHistory = history.slice(0, -1);
         return {
            game: previous,
            history: newHistory,
            future: [game, ...future]
         };

      case 'REDO':
         if (future.length === 0) return state;
         const next = future[0];
         const newFuture = future.slice(1);
         return {
            game: next,
            history: [...history, game],
            future: newFuture
         };

      case 'RESTART':
         return {
            game: new Game(),
            history: [],
            future: []
         };
         
      case 'FROM_STOCK_TO_WASTE':
         const newStateStock = { 
            ...game, 
            stockPile: action.payload.stockPile.clone(), 
            wastePile: action.payload.wastePile.clone()
         };
         return {
            game: newStateStock,
            history: [...history, game],
            future: []
         };
         
      case 'FROM_WASTE':
         const newStateWaste = { 
            ...game, 
            tableauPiles: action.payload.tableauPiles.map(p => p.clone()), 
            foundationPiles: {
               Hearts: action.payload.foundationPiles.Hearts.clone(),
               Diamonds: action.payload.foundationPiles.Diamonds.clone(),
               Clubs: action.payload.foundationPiles.Clubs.clone(),
               Spades: action.payload.foundationPiles.Spades.clone(),
            }, 
            wastePile: action.payload.wastePile.clone()
         };
         return {
            game: newStateWaste,
            history: [...history, game],
            future: []
         };
         
      case 'FROM_TABLEAU':
         const newStateTableau = { 
            ...game, 
            tableauPiles: action.payload.tableauPiles.map(p => p.clone()), 
            foundationPiles: {
               Hearts: action.payload.foundationPiles.Hearts.clone(),
               Diamonds: action.payload.foundationPiles.Diamonds.clone(),
               Clubs: action.payload.foundationPiles.Clubs.clone(),
               Spades: action.payload.foundationPiles.Spades.clone(),
            }
         };
         return {
            game: newStateTableau,
            history: [...history, game],
            future: []
         };
      
      case 'FROM_FOUNDATION':
         const newStateFoundation = { 
            ...game, 
            tableauPiles: action.payload.tableauPiles.map(p => p.clone()), 
            foundationPiles: {
               Hearts: action.payload.foundationPiles.Hearts.clone(),
               Diamonds: action.payload.foundationPiles.Diamonds.clone(),
               Clubs: action.payload.foundationPiles.Clubs.clone(),
               Spades: action.payload.foundationPiles.Spades.clone(),
            }
         };
         return {
            game: newStateFoundation,
            history: [...history, game],
            future: []
         };
         
   
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

