import { Box, HStack, Spacer, VStack } from "@chakra-ui/react"
import useGameState from "../hooks/useGameState";
import Tableau from "../components/Tableau";
import Foundation from "../components/Foundation";
import WastePile from "../components/WastePile";
import StockPile from "../components/StockPile";
import { moveFromWaste, moveStockToWaste } from "../libs/logic/GameLogic";

const Game = () => {

  const { state, dispatch } = useGameState();


  const handleStockPile = () => {

    stockPile, wastePile = moveStockToWaste(stockPile, wastePile)
    console.log(stockPile, wastePile)
    dispatch({ type: 'FROM_STOCK_TO_WASTE', payload: { stockPile, wastePile } })
  }

  const handleWastePile = () => {
    let foundationPiles = state.foundationPiles
    tableauPiles, foundationPiles, wastePile = moveFromWaste(tableauPiles, foundationPiles, wastePile)

    dispatch({ type: 'FROM_WASTE', payload: {tableauPiles, foundationPiles, wastePile}})
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
            <Box ><Foundation cards={foundationHearts} /></Box>
            <Box ><Foundation cards={foundationDiamonds} /></Box>
            <Box ><Foundation cards={foundationClubs} /></Box>
            <Box ><Foundation cards={foundationSpades} /></Box>

          </HStack>
          <Spacer />
          <HStack >
            <Box onClick={handleWastePile}><WastePile cards={wastePile} /></Box>
            <Box onClick={handleStockPile}><StockPile cards={stockPile} /></Box>

          </HStack>
        </HStack>

        <HStack w={'60%'} h={'auto'} align={'start'} spacing={4}>
          {tableauPiles && tableauPiles.map((pile) => (
            <Box key={pile.top.card.rank + pile.top.card.suit} ><Tableau cards={pile} /></Box>
          ))}
        </HStack>
      </VStack>
    </Box>
  )
}

export default Game