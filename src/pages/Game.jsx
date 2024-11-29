import { useState } from "react";
import { Box, HStack, VStack, useBreakpointValue, Button, ButtonGroup, Icon } from "@chakra-ui/react"
import { IoArrowBack, IoRefresh, IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
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
  const game = state.game;
  const history = state.history;
  const future = state.future;

  const [isGameWon, setIsGameWon] = useState(false);
  const cardMetrics = useBreakpointValue(CARD_PRESETS) ?? CARD_PRESETS.md;
  const boardLayout = useBreakpointValue(BOARD_LAYOUT_PRESETS) ?? BOARD_LAYOUT_PRESETS.md;
  const boardSurface = useBreakpointValue(BOARD_SURFACE_STYLES) ?? BOARD_SURFACE_STYLES.md;

  let tableauPiles = game.tableauPiles;
  let stockPile = game.stockPile;
  let wastePile = game.wastePile;
  let foundationHearts = game.foundationPiles.Hearts;
  let foundationDiamonds = game.foundationPiles.Diamonds;
  let foundationSpades = game.foundationPiles.Spades;
  let foundationClubs = game.foundationPiles.Clubs;

  const evaluateWin = () => {
    if (checkWin(tableauPiles, wastePile, stockPile)) {
      setIsGameWon(true)
    }
  }

  const handleStockPile = () => {
    const currentStock = game.stockPile.clone();
    const currentWaste = game.wastePile.clone();
    
    const moved = moveStockToWaste(currentStock, currentWaste)

    if (moved) {
      dispatch({ type: 'FROM_STOCK_TO_WASTE', payload: { stockPile: currentStock, wastePile: currentWaste } })
      evaluateWin()
    }
  }

  const handleWastePile = () => {
      const currentTableau = game.tableauPiles.map(p => p.clone());
      const currentFoundations = {
        Hearts: game.foundationPiles.Hearts.clone(),
        Diamonds: game.foundationPiles.Diamonds.clone(),
        Clubs: game.foundationPiles.Clubs.clone(),
        Spades: game.foundationPiles.Spades.clone(),
      };
      const currentWaste = game.wastePile.clone();

      const moved = moveFromWaste(currentTableau, currentFoundations, currentWaste)

      if (moved) {
        dispatch({ type: 'FROM_WASTE', payload: {
          tableauPiles: currentTableau, 
          foundationPiles: currentFoundations, 
          wastePile: currentWaste
        }})
        evaluateWin()
      }
  }
  
  const handleFoundation = (cards) => {
    const currentTableau = game.tableauPiles.map(p => p.clone());
    const currentFoundations = {
      Hearts: game.foundationPiles.Hearts.clone(),
      Diamonds: game.foundationPiles.Diamonds.clone(),
      Clubs: game.foundationPiles.Clubs.clone(),
      Spades: game.foundationPiles.Spades.clone(),
    };

    const moved = moveFromFoundation(cards.peek(), currentTableau, currentFoundations)

    if (moved) {
      dispatch({ type: 'FROM_FOUNDATION', payload: {
        tableauPiles: currentTableau, 
        foundationPiles: currentFoundations
      }})
      evaluateWin()
    }
    
  }

  const handleUndo = () => dispatch({ type: 'UNDO' });
  const handleRedo = () => dispatch({ type: 'REDO' });
  const handleRestart = () => {
     if (window.confirm("Are you sure you want to restart the game?")) {
        dispatch({ type: 'RESTART' });
     }
  };

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
          <VStack spacing={4}>
            {/* Top Toolbar */}
            <HStack w="100%" justify="space-between">
              <Button 
                as={Link} 
                to="/" 
                variant="ghost" 
                color="whiteAlpha.800"
                leftIcon={<Icon as={IoArrowBack} />}
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
              >
                Back
              </Button>

              <ButtonGroup size="sm" isAttached variant="outline" colorScheme="whiteAlpha">
                <Button 
                  onClick={handleUndo} 
                  isDisabled={history.length === 0}
                  leftIcon={<Icon as={IoArrowBackCircleOutline} />}
                >
                  Undo
                </Button>
                <Button 
                  onClick={handleRedo} 
                  isDisabled={future.length === 0}
                  rightIcon={<Icon as={IoArrowForwardCircleOutline} />}
                >
                  Redo
                </Button>
              </ButtonGroup>

              <Button 
                size="sm" 
                color="whiteAlpha.800" 
                variant="ghost" 
                _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                onClick={handleRestart}
                leftIcon={<Icon as={IoRefresh} />}
              >
                Restart
              </Button>
            </HStack>

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
          </VStack>
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