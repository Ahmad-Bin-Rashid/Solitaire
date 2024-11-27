/* eslint-disable react/prop-types */
import PlayingCard from "./PlayingCard"

const StockPile = ({cards}) => {
  return (
    <PlayingCard
      src={cards.isEmpty() ? "blank-card.png" : "card-bg.png"}
      isClickable
    />
  )
}

export default StockPile