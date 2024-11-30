/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion"
import PlayingCard from "./PlayingCard"

const MotionBox = motion.div

const StockPile = ({cards}) => {
  const stackKey = cards.peek() ? `${cards.peek().rank}-${cards.peek().suit}` : 'empty'

  return (
    <AnimatePresence mode="wait">
      <MotionBox
        key={stackKey}
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: -6 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <PlayingCard
          src={cards.isEmpty() ? "blank-card.png" : "card-bg.png"}
          isClickable
        />
      </MotionBox>
    </AnimatePresence>
  )
}

export default StockPile