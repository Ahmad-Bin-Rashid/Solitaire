import { Box, useBreakpointValue } from "@chakra-ui/react"
import useGameState from "../hooks/useGameState";
import { moveFromTableau } from "../libs/logic/GameLogic";
import PlayingCard from "./PlayingCard";
import { CARD_PRESETS } from "../styles/cardStyles";


const Tableau = ({ cards: pile, pileIndex, onMoveComplete, onCardDragStart, onCardDragEnd }) => {

   const { state, dispatch } = useGameState();
   const cardMetrics = useBreakpointValue(CARD_PRESETS) ?? CARD_PRESETS.md;

   const cards = pile.getCards() ?? []
   const cardSpacing = cardMetrics.stackGap
   const pileHeight = cards.length > 0
      ? cardMetrics.cardHeight + (cards.length - 1) * cardSpacing
      : cardMetrics.cardHeight

   const handleClick = (card) => {
      const game = state.game;
      if (card.faceUp) {
         // Clone state to ensure immutability and trigger re-renders properly
         const currentTableau = game.tableauPiles.map(p => p.clone());
         const currentFoundations = {
            Hearts: game.foundationPiles.Hearts.clone(),
            Diamonds: game.foundationPiles.Diamonds.clone(),
            Clubs: game.foundationPiles.Clubs.clone(),
            Spades: game.foundationPiles.Spades.clone(),
         };
         
         // Find the source pile in our cloned array
         const sourcePileIndex = game.tableauPiles.indexOf(pile);
         const sourcePile = currentTableau[sourcePileIndex];

         const moved = moveFromTableau(card, sourcePile, currentTableau, currentFoundations)

         if (moved) {
            const nextGame = {
               ...game,
               tableauPiles: currentTableau,
               foundationPiles: currentFoundations,
            }

            dispatch({ 
               type: 'FROM_TABLEAU', 
               payload: { 
                  tableauPiles: currentTableau, 
                  foundationPiles: currentFoundations 
               } 
            })
            onMoveComplete?.(nextGame)
         }
      }
   }
   return (
      <Box position="relative" minH={`${pileHeight}px`} width={`${cardMetrics.cardWidth}px`} flex="0 0 auto">
         {pile.peek() ? cards.map(({ card }, index) => (
            <PlayingCard
               key={card.rank + card.suit}
               layoutId={`${card.rank}-${card.suit}`}
               src={card.faceUp ? `${card.rank}-${card.suit}.png` : 'card-bg.png'}
               position="absolute"
               top={`${index * cardSpacing}px`}
               left="0"
               zIndex={index + 1}
               metrics={cardMetrics}
               isClickable={card.faceUp}
               onClick={() => handleClick(card)}
               draggable={card.faceUp}
               onDragStart={(event) => onCardDragStart?.({ sourceType: 'tableau', pileIndex, card }, event)}
               onDragEnd={onCardDragEnd}
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