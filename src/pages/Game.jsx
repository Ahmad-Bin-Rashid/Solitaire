import { useState } from "react";
import { Box, HStack, Spacer, VStack } from "@chakra-ui/react"
import useGameState from "../hooks/useGameState";
import Tableau from "../components/Tableau";
import Foundation from "../components/Foundation";
import WastePile from "../components/WastePile";
import StockPile from "../components/StockPile";
import { checkWin, moveFromFoundation, moveFromWaste, moveStockToWaste } from "../libs/logic/GameLogic";
import GameCompletionModal from "../components/GameCompletionModal";

const Game = () => {

  const { state, dispatch } = useGameState();
  const [isGameWon, setIsGameWon] = useState(false);

  const handleStockPile = () => {
    if (checkWin(tableauPiles, wastePile, stockPile)) {
      setIsGameWon(true);
    }
    stockPile, wastePile = moveStockToWaste(stockPile, wastePile)
    dispatch({ type: 'FROM_STOCK_TO_WASTE', payload: { stockPile, wastePile } })
    
  }



  const handleWastePile = () => {
    if (checkWin(tableauPiles, wastePile, stockPile)) {
      setIsGameWon(true);
    }
      let foundationPiles = state.foundationPiles
      tableauPiles, foundationPiles, wastePile = moveFromWaste(tableauPiles, foundationPiles, wastePile)
      dispatch({ type: 'FROM_WASTE', payload: {tableauPiles, foundationPiles, wastePile}})
  }
  
  const handleFoundation = (cards) => {
    if (checkWin(tableauPiles, wastePile, stockPile)) {
      setIsGameWon(true);
    }
    let foundationPiles = state.foundationPiles
    tableauPiles, foundationPiles = moveFromFoundation(cards.peek(), tableauPiles, foundationPiles)
    dispatch({ type: 'FROM_FOUNDATION', payload: {tableauPiles, foundationPiles}})
    
  }

  let tableauPiles = state.tableauPiles;
  let stockPile = state.stockPile;
  let wastePile = state.wastePile;
  let foundationHearts = state.foundationPiles.Hearts;
  let foundationDiamonds = state.foundationPiles.Diamonds;
  let foundationSpades = state.foundationPiles.Spades;
  let foundationClubs = state.foundationPiles.Clubs;

  return (

    <Box backgroundImage={'background.jpg'} minH={'100vh'} width={'100%'}>

      <VStack >
        <HStack borderBottom={'1px'} h={'20%'} w={'80%'} my={2} mx={'30%'} padding={'3'}>
          <HStack >
            <Box onClick={() => handleFoundation(foundationHearts)} ><Foundation cards={foundationHearts} /></Box>
            <Box onClick={() => handleFoundation(foundationDiamonds)}><Foundation cards={foundationDiamonds} /></Box>
            <Box onClick={() => handleFoundation(foundationClubs)}><Foundation cards={foundationClubs} /></Box>
            <Box onClick={() => handleFoundation(foundationSpades)}><Foundation cards={foundationSpades} /></Box>

          </HStack>
          <Spacer />
          <HStack >
            <Box onClick={handleWastePile}><WastePile cards={wastePile} /></Box>
            <Box onClick={handleStockPile}><StockPile cards={stockPile} /></Box>

          </HStack>
        </HStack>

        <HStack w={'60%'} h={'auto'} mb={'60px'} align={'start'} spacing={4}>
          {tableauPiles && tableauPiles.map((pile) => (
            <Box key={pile.top?.card ? pile.top.card.rank + pile.top.card.suit : (Math.random()*100).toString()} position={"relative"} width={'100px'}>
              <Tableau cards={pile} />
            </Box>
          ))}
        </HStack>
      </VStack>

      <GameCompletionModal isOpen={isGameWon} onClose={() => setIsGameWon(false)} />
    </Box>
  )
}

export default Game