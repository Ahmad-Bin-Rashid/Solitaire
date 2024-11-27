import { useState } from "react";
import { Box, HStack, VStack, useBreakpointValue } from "@chakra-ui/react"
import useGameState from "../hooks/useGameState";
import Tableau from "../components/Tableau";
import Foundation from "../components/Foundation";
import WastePile from "../components/WastePile";
import StockPile from "../components/StockPile";
import { checkWin, moveFromFoundation, moveFromWaste, moveStockToWaste } from "../libs/logic/GameLogic";
import GameCompletionModal from "../components/GameCompletionModal";
import { BOARD_LAYOUT_PRESETS, CARD_PRESETS } from "../styles/cardStyles";
import { BOARD_SURFACE_STYLES } from "../styles/layoutStyles";

const Game = () => {

  const { state, dispatch } = useGameState();
  const [isGameWon, setIsGameWon] = useState(false);
  const cardMetrics = useBreakpointValue(CARD_PRESETS) ?? CARD_PRESETS.md;
  const boardLayout = useBreakpointValue(BOARD_LAYOUT_PRESETS) ?? BOARD_LAYOUT_PRESETS.md;
  const boardSurface = useBreakpointValue(BOARD_SURFACE_STYLES) ?? BOARD_SURFACE_STYLES.md;

  let tableauPiles = state.tableauPiles;
  let stockPile = state.stockPile;
  let wastePile = state.wastePile;
  let foundationHearts = state.foundationPiles.Hearts;
  let foundationDiamonds = state.foundationPiles.Diamonds;
  let foundationSpades = state.foundationPiles.Spades;
  let foundationClubs = state.foundationPiles.Clubs;

  const evaluateWin = () => {
    if (checkWin(tableauPiles, wastePile, stockPile)) {
      setIsGameWon(true)
    }
  }

  const handleStockPile = () => {
    const moved = moveStockToWaste(stockPile, wastePile)

    if (moved) {
      dispatch({ type: 'FROM_STOCK_TO_WASTE', payload: { stockPile, wastePile } })
      evaluateWin()
    }
  }



  const handleWastePile = () => {
      const foundationPiles = state.foundationPiles
      const moved = moveFromWaste(tableauPiles, foundationPiles, wastePile)

      if (moved) {
        dispatch({ type: 'FROM_WASTE', payload: {tableauPiles, foundationPiles, wastePile}})
        evaluateWin()
      }
  }
  
  const handleFoundation = (cards) => {
    const foundationPiles = state.foundationPiles
    const moved = moveFromFoundation(cards.peek(), tableauPiles, foundationPiles)

    if (moved) {
      dispatch({ type: 'FROM_FOUNDATION', payload: {tableauPiles, foundationPiles}})
      evaluateWin()
    }
    
  }

  return (
    <Box
      minH="100vh"
      width="100%"
      bg={boardSurface.shellBg}
      position="relative"
      px={boardLayout.pagePaddingX}
      py={boardLayout.pagePaddingY}
    >
      <VStack
        position="relative"
        zIndex={1}
        minH="calc(100vh - 48px)"
        spacing={boardLayout.surfaceGap}
        align="stretch"
        justify="space-between"
        maxW="1280px"
        mx="auto"
        w="100%"
      >
        <Box
          bg={boardSurface.railBg}
          border="1px solid rgba(255, 255, 255, 0.14)"
          borderRadius={boardLayout.railRadius}
          boxShadow="0 18px 50px rgba(0, 0, 0, 0.28)"
          backdropFilter="blur(10px)"
          px={boardLayout.railPaddingX}
          py={boardLayout.railPaddingY}
        >
          <HStack
            w="100%"
            justify="space-between"
            align="center"
            spacing={6}
            flexWrap="wrap"
            gap={4}
          >
            <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap" justify="center">
              <Box onClick={() => handleFoundation(foundationHearts)}><Foundation cards={foundationHearts} /></Box>
              <Box onClick={() => handleFoundation(foundationDiamonds)}><Foundation cards={foundationDiamonds} /></Box>
              <Box onClick={() => handleFoundation(foundationClubs)}><Foundation cards={foundationClubs} /></Box>
              <Box onClick={() => handleFoundation(foundationSpades)}><Foundation cards={foundationSpades} /></Box>
            </HStack>

            <HStack spacing={{ base: 2, md: 4 }}>
              <Box onClick={handleWastePile}><WastePile cards={wastePile} /></Box>
              <Box onClick={handleStockPile}><StockPile cards={stockPile} /></Box>
            </HStack>
          </HStack>
        </Box>

        <Box
          flex="1"
          bg={boardSurface.boardBg}
          border="1px solid rgba(255, 255, 255, 0.12)"
          borderRadius={boardLayout.boardRadius}
          boxShadow="0 24px 70px rgba(0, 0, 0, 0.28)"
          backdropFilter="blur(8px)"
          px={boardLayout.boardPaddingX}
          py={boardLayout.boardPaddingY}
          display="flex"
          alignItems="flex-start"
          overflowX={{ base: "auto", md: "visible" }}
        >
          <HStack
            w="100%"
            align="flex-start"
            justify={{ base: "flex-start", md: "center" }}
            spacing={{ base: 2, md: cardMetrics.boardGap }}
            flexWrap="nowrap"
            minW="max-content"
          >
            {tableauPiles && tableauPiles.map((pile) => (
              <Box
                key={pile.top?.card ? pile.top.card.rank + pile.top.card.suit : (Math.random() * 100).toString()}
                position="relative"
                width={`${cardMetrics.cardWidth}px`}
                flex={`0 0 ${cardMetrics.cardWidth}px`}
              >
                <Tableau cards={pile} onMoveComplete={evaluateWin} />
              </Box>
            ))}
          </HStack>
        </Box>
      </VStack>

      <GameCompletionModal isOpen={isGameWon} onClose={() => setIsGameWon(false)} />
    </Box>
  )
}

export default Game