/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion"
import PlayingCard from "./PlayingCard"

const MotionBox = motion.div

const WastePile = ({cards, onCardDragStart, onCardDragEnd}) => {
  const topCard = cards.peek()
  const topCardKey = topCard ? `${topCard.rank}-${topCard.suit}` : 'empty'

  return (
   <AnimatePresence mode="wait">
      <MotionBox
        key={topCardKey}
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: -8 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <PlayingCard 
          layoutId={topCard ? `${topCard.rank}-${topCard.suit}` : undefined}
          src={topCard ? `${topCard.rank}-${topCard.suit}.png` : 'blank-card.png'} 
          isClickable={Boolean(topCard)}
          draggable={Boolean(topCard)}
          onDragStart={(event) => topCard && onCardDragStart?.({ sourceType: 'waste', card: topCard }, event)}
          onDragEnd={onCardDragEnd}
        />
      </MotionBox>
    </AnimatePresence>
  )
}

export default WastePile