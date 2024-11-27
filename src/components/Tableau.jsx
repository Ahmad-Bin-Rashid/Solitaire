import { Box, useBreakpointValue } from "@chakra-ui/react"
import useGameState from "../hooks/useGameState";
import { moveFromTableau } from "../libs/logic/GameLogic";
import PlayingCard from "./PlayingCard";
import { CARD_PRESETS } from "../styles/cardStyles";


const Tableau = ({ cards: pile, onMoveComplete }) => {

   const { state, dispatch } = useGameState();
   const cardMetrics = useBreakpointValue(CARD_PRESETS) ?? CARD_PRESETS.md;

   const cards = pile.getCards() ?? []
   const cardSpacing = cardMetrics.stackGap
   const pileHeight = cards.length > 0
      ? cardMetrics.cardHeight + (cards.length - 1) * cardSpacing
      : cardMetrics.cardHeight

   const handleClick = (card) => {
      let tableauPiles = state.tableauPiles
      let wastePile = state.wastePile
      let stockPile = state.stockPile

      if (card.faceUp) {
         let foundationPiles = state.foundationPiles
         const moved = moveFromTableau(card, pile, tableauPiles, foundationPiles)

         if (moved) {
            dispatch({ type: 'FROM_TABLEAU', payload: { tableauPiles, foundationPiles } })
            onMoveComplete?.()
         }
      }
   }
   return (
      <Box position="relative" minH={`${pileHeight}px`} width={`${cardMetrics.cardWidth}px`} flex="0 0 auto">
         {pile.peek() ? cards.map(({ card }, index) => (
            <PlayingCard
               key={card.rank + card.suit}
               src={card.faceUp ? `${card.rank}-${card.suit}.png` : 'card-bg.png'}
               position="absolute"
               top={`${index * cardSpacing}px`}
               left="0"
               zIndex={index + 1}
               metrics={cardMetrics}
               isClickable={card.faceUp}
               onClick={() => handleClick(card)}
            />

         )) : (
            <PlayingCard
               src={'blank-card.png'}
               metrics={cardMetrics}
               isClickable={false}
            />
         )}
      </Box>
   )
}

export default Tableau