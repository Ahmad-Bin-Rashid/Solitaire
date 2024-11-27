/* eslint-disable react/prop-types */
import PlayingCard from "./PlayingCard"

const Foundation = ({ cards }) => {
   return (
      <PlayingCard
         src={cards.peek() ? `${cards.peek().rank}-${cards.peek().suit}.png` : 'blank-card.png'}
         isClickable={Boolean(cards.peek())}
      />
   )
}

export default Foundation