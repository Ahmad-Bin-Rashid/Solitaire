/* eslint-disable react/prop-types */
import PlayingCard from "./PlayingCard"


const Foundation = ({ cards, onCardDragStart, onCardDragEnd }) => {
   const topCard = cards.peek()
   const topCardKey = topCard ? `${topCard.rank}-${topCard.suit}` : 'empty'

   return (
            <PlayingCard
               layoutId={topCard ? `${topCard.rank}-${topCard.suit}` : undefined}
               src={topCard ? `${topCard.rank}-${topCard.suit}.png` : 'blank-card.png'}
               isClickable={Boolean(topCard)}
               draggable={Boolean(topCard)}
               onDragStart={(event) => topCard && onCardDragStart?.({ sourceType: 'foundation', card: topCard }, event)}
               onDragEnd={onCardDragEnd}
            />
   )
}

export default Foundation