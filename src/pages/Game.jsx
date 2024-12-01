import { useState, useEffect } from "react";
import { Box, HStack, VStack, useBreakpointValue, Button, ButtonGroup, Icon } from "@chakra-ui/react"
import { LayoutGroup } from "framer-motion";
import { IoArrowBack, IoRefresh, IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import useGameState from "../hooks/useGameState";
import Tableau from "../components/Tableau";
import Foundation from "../components/Foundation";
import WastePile from "../components/WastePile";
import StockPile from "../components/StockPile";
import {
  checkWin,
  canPlaceOnFoundation,
  canPlaceOnTableau,
  canMoveSequenceToTableau,
  moveFoundationToTableau,
  moveFromFoundation,
  moveFromWaste,
  moveStockToWaste,
  moveTableauToFoundation,
  moveTableauToTableau,
  moveWasteToFoundation,
  moveWasteToTableau,
  canAutoComplete,
} from "../libs/logic/GameLogic";
import GameCompletionModal from "../components/GameCompletionModal";
import { BOARD_LAYOUT_PRESETS, CARD_PRESETS } from "../styles/cardStyles";
import { BOARD_SURFACE_STYLES } from "../styles/layoutStyles";

const Game = () => {

  const { state, dispatch } = useGameState();
  const game = state.game;
  const history = state.history;
  const future = state.future;

  const [isGameWon, setIsGameWon] = useState(false);
  const [dragState, setDragState] = useState(null);
  const [hoveredDropTarget, setHoveredDropTarget] = useState(null);
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

  const cloneFoundationPiles = (sourceFoundations) => ({
    Hearts: sourceFoundations.Hearts.clone(),
    Diamonds: sourceFoundations.Diamonds.clone(),
    Clubs: sourceFoundations.Clubs.clone(),
    Spades: sourceFoundations.Spades.clone(),
  });

  const clearDragState = () => {
    setDragState(null);
    setHoveredDropTarget(null);
  };

  useEffect(() => {
    if (!isGameWon && canAutoComplete(tableauPiles, wastePile, stockPile)) {
      const timer = setTimeout(() => {
        const currentTableau = game.tableauPiles.map(p => p.clone());
        const currentFoundations = cloneFoundationPiles(game.foundationPiles);
        let moved = false;

        for (let i = 0; i < currentTableau.length; i++) {
          const sourcePile = currentTableau[i];
          const topCard = sourcePile.peek();
          if (!topCard) continue;

          const targetFoundation = currentFoundations[topCard.suit];
          if (canPlaceOnFoundation(topCard, targetFoundation)) {
             targetFoundation.push(sourcePile.pop());
             moved = true;
             break;
          }
        }

        if (moved) {
          dispatch({
            type: 'FROM_TABLEAU',
            payload: {
              tableauPiles: currentTableau,
              foundationPiles: currentFoundations,
            }
          });
          
          if (checkWin(currentTableau, wastePile, stockPile)) {
             setIsGameWon(true);
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [game, isGameWon, tableauPiles, wastePile, stockPile]);

  const evaluateWin = (nextGame = game) => {
    if (checkWin(nextGame.tableauPiles, nextGame.wastePile, nextGame.stockPile)) {
      setIsGameWon(true)
    }
  }

  const getDraggedSequence = () => {
    if (!dragState || dragState.sourceType !== 'tableau') {
      return dragState?.card ? [dragState.card] : []
    }

    const sourcePile = game.tableauPiles[dragState.pileIndex]
    const sourceCards = sourcePile?.getCards() ?? []
    const movingIndex = sourceCards.findIndex((node) => node.card === dragState.card)

    if (movingIndex === -1) {
      return []
    }

    return sourceCards.slice(movingIndex).map((node) => node.card)
  }

  const canDropOnTableau = (targetPile) => {
    if (!dragState) {
      return false
    }

    if (dragState.sourceType === 'tableau') {
      const sequence = getDraggedSequence()

      return sequence.length > 0 && canMoveSequenceToTableau(sequence) && canPlaceOnTableau(sequence[0], targetPile)
    }

    return canPlaceOnTableau(dragState.card, targetPile)
  }

  const canDropOnFoundation = (suit, targetFoundation) => {
    if (!dragState || dragState.sourceType === 'foundation' || dragState.card.suit !== suit) {
      return false
    }

    if (dragState.sourceType === 'tableau' && getDraggedSequence().length !== 1) {
      return false
    }

    return canPlaceOnFoundation(dragState.card, targetFoundation)
  }

  const handleCardDragStart = (dragInfo, event) => {
    setIsGameWon(false)
    setDragState(dragInfo)
    setHoveredDropTarget(null)

    if (event?.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', 'solitaire')
    }
  }

  const handleCardDragEnd = () => {
    clearDragState()
  }

  const handleFoundationDrop = (suit) => {
    if (!dragState) {
      return
    }

    const currentTableau = game.tableauPiles.map((pile) => pile.clone())
    const currentFoundations = cloneFoundationPiles(game.foundationPiles)
    const currentWaste = game.wastePile.clone()
    const targetFoundation = currentFoundations[suit]
    let moved = false

    if (dragState.sourceType === 'tableau') {
      const sourcePile = currentTableau[dragState.pileIndex]
      moved = moveTableauToFoundation(dragState.card, sourcePile, targetFoundation)
    } else if (dragState.sourceType === 'waste') {
      moved = moveWasteToFoundation(currentWaste, targetFoundation)
    }

    if (moved) {
      dispatch({
        type: dragState.sourceType === 'waste' ? 'FROM_WASTE' : 'FROM_TABLEAU',
        payload: {
          tableauPiles: currentTableau,
          foundationPiles: currentFoundations,
          wastePile: currentWaste,
        },
      })

      evaluateWin({
        ...game,
        tableauPiles: currentTableau,
        foundationPiles: currentFoundations,
        wastePile: currentWaste,
      })
    }

    clearDragState()
  }

  const handleTableauDrop = (targetIndex) => {
    if (!dragState) {
      return
    }

    const currentTableau = game.tableauPiles.map((pile) => pile.clone())
    const currentFoundations = cloneFoundationPiles(game.foundationPiles)
    const currentWaste = game.wastePile.clone()
    const targetPile = currentTableau[targetIndex]
    let moved = false

    if (dragState.sourceType === 'tableau') {
      const sourcePile = currentTableau[dragState.pileIndex]
      moved = moveTableauToTableau(dragState.card, sourcePile, targetPile)
    } else if (dragState.sourceType === 'waste') {
      moved = moveWasteToTableau(currentWaste, targetPile)
    } else if (dragState.sourceType === 'foundation') {
      const sourceFoundation = currentFoundations[dragState.card.suit]
      moved = moveFoundationToTableau(sourceFoundation, targetPile)
    }

    if (moved) {
      dispatch({
        type: dragState.sourceType === 'waste'
          ? 'FROM_WASTE'
          : dragState.sourceType === 'foundation'
            ? 'FROM_FOUNDATION'
            : 'FROM_TABLEAU',
        payload: {
          tableauPiles: currentTableau,
          foundationPiles: currentFoundations,
          wastePile: currentWaste,
        },
      })

      evaluateWin({
        ...game,
        tableauPiles: currentTableau,
        foundationPiles: currentFoundations,
        wastePile: currentWaste,
      })
    }

    clearDragState()
  }

  const getDropZoneStyles = (isValid, isHovered) => ({
    border: isHovered
      ? '1px solid rgba(168, 255, 214, 0.95)'
      : isValid
        ? '1px dashed rgba(168, 255, 214, 0.55)'
        : '1px solid transparent',
    boxShadow: isHovered
      ? '0 0 0 3px rgba(168, 255, 214, 0.24), 0 0 24px rgba(168, 255, 214, 0.16)'
      : isValid
        ? '0 0 0 2px rgba(168, 255, 214, 0.08)'
        : 'none',
    bg: isHovered ? 'rgba(168, 255, 214, 0.08)' : 'transparent',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'all 140ms ease',
  })

  const handleStockPile = () => {
    const currentStock = game.stockPile.clone();
    const currentWaste = game.wastePile.clone();
    
    const moved = moveStockToWaste(currentStock, currentWaste)

    if (moved) {
          dispatch({ type: 'FROM_STOCK_TO_WASTE', payload: { stockPile: currentStock, wastePile: currentWaste } })
          evaluateWin({ ...game, stockPile: currentStock, wastePile: currentWaste })
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
        evaluateWin({
          ...game,
          tableauPiles: currentTableau,
          foundationPiles: currentFoundations,
          wastePile: currentWaste,
        })
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
      evaluateWin({
        ...game,
        tableauPiles: currentTableau,
        foundationPiles: currentFoundations,
      })
    }
    
  }

  const handleUndo = () => {
    clearDragState();
    setIsGameWon(false);
    dispatch({ type: 'UNDO' });
  };
  const handleRedo = () => {
    clearDragState();
    setIsGameWon(false);
    dispatch({ type: 'REDO' });
  };
  const handleRestart = () => {
     if (window.confirm("Are you sure you want to restart the game?")) {
        clearDragState();
        setIsGameWon(false);
        dispatch({ type: 'RESTART' });
     }
  };

  return (
    <LayoutGroup id="solitaire-board">
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
                {[
                  ['Hearts', foundationHearts],
                  ['Diamonds', foundationDiamonds],
                  ['Clubs', foundationClubs],
                  ['Spades', foundationSpades],
                ].map(([suit, cards]) => {
                  const isValid = canDropOnFoundation(suit, cards)
                  const isHovered = hoveredDropTarget?.type === 'foundation' && hoveredDropTarget?.id === suit

                  return (
                    <Box
                      key={suit}
                      onClick={() => handleFoundation(cards)}
                      onDragEnter={() => isValid && setHoveredDropTarget({ type: 'foundation', id: suit })}
                      onDragLeave={() => isHovered && setHoveredDropTarget(null)}
                      onDragOver={(event) => {
                        if (isValid) {
                          event.preventDefault()
                          event.dataTransfer.dropEffect = 'move'
                          setHoveredDropTarget({ type: 'foundation', id: suit })
                        }
                      }}
                      onDrop={(event) => {
                        event.preventDefault()
                        handleFoundationDrop(suit)
                      }}
                      {...getDropZoneStyles(isValid, isHovered)}
                      borderRadius="lg"
                    >
                      <Foundation
                        cards={cards}
                        onCardDragStart={handleCardDragStart}
                        onCardDragEnd={handleCardDragEnd}
                      />
                    </Box>
                  )
                })}
              </HStack>

              <HStack spacing={{ base: 2, md: 4 }}>
                <Box onClick={handleWastePile}>
                  <WastePile 
                    cards={wastePile} 
                    onCardDragStart={handleCardDragStart}
                    onCardDragEnd={handleCardDragEnd}
                  />
                </Box>
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
              {tableauPiles && tableauPiles.map((pile, index) => {
                const isValid = canDropOnTableau(pile)
                const isHovered = hoveredDropTarget?.type === 'tableau' && hoveredDropTarget?.id === index

                return (
                  <Box
                    key={index}
                    position="relative"
                    width={`${cardMetrics.cardWidth}px`}
                    flex={`0 0 ${cardMetrics.cardWidth}px`}
                    onDragEnter={() => isValid && setHoveredDropTarget({ type: 'tableau', id: index })}
                    onDragLeave={() => isHovered && setHoveredDropTarget(null)}
                    onDragOver={(event) => {
                      if (isValid) {
                        event.preventDefault()
                        event.dataTransfer.dropEffect = 'move'
                        setHoveredDropTarget({ type: 'tableau', id: index })
                      }
                    }}
                    onDrop={(event) => {
                      event.preventDefault()
                      handleTableauDrop(index)
                    }}
                    {...getDropZoneStyles(isValid, isHovered)}
                    borderRadius="lg"
                  >
                    <Tableau
                      cards={pile}
                      pileIndex={index}
                      onMoveComplete={evaluateWin}
                      onCardDragStart={handleCardDragStart}
                      onCardDragEnd={handleCardDragEnd}
                    />
                  </Box>
                )
              })}
            </HStack>
          </Box>
        </VStack>

        <GameCompletionModal isOpen={isGameWon} onClose={() => setIsGameWon(false)} onRestart={handleRestart} />
      </Box>
    </LayoutGroup>
  )
}

export default Game