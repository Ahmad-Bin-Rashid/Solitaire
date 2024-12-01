/* eslint-disable react/prop-types */
import PlayingCard from "./PlayingCard"


const StockPile = ({cards}) => {
  const stackKey = cards.peek() ? `${cards.peek().rank}-${cards.peek().suit}` : 'empty'

  return (
        <PlayingCard
          src={cards.isEmpty() ? "blank-card.png" : "card-bg.png"}
          isClickable
        />
  )
}

export default StockPile