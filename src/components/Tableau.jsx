import { Image } from "@chakra-ui/react"
import useGameState from "../hooks/useGameState";
import { moveFromTableau } from "../libs/logic/GameLogic";


const Tableau = (pile) => {

   const { state, dispatch } = useGameState();

   const cards = pile.cards.getCards()
   console.log(cards)
   const handleClick = (card) => {
      if (card.faceUp) {

         let foundationPiles = state.foundationPiles
         let tableauPiles = state.tableauPiles
         tableauPiles, foundationPiles = moveFromTableau(card, pile.cards, tableauPiles, foundationPiles)

         dispatch({ type: 'FROM_TABLEAU', payload: { tableauPiles, foundationPiles } })

      }
   }
   return (
      <>
         {pile.cards.peek() ? (cards.map(({ card }) => (
            <Image
               key={card.rank + card.suit}
               src={card ? (card.faceUp ? `${card.rank}-${card.suit}.png` : "card-bg.png") : 'blank-card.png'}
               height={'120px'}
               width={'auto'}
               cursor={card.faceUp ? 'pointer' : 'default'}
               _hover={card.faceUp ? { shadow: '2xl', border: '1px', borderColor: 'brown' } : {}}
               onClick={() => handleClick(card)}
            />

         ))) :
         (<Image
            src={'blank-card.png'}
            height={'120px'}
            width={'auto'}
            cursor={'default'}
         />)
         }
      </>
   )
}

export default Tableau