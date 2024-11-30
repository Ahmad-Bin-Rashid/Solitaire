/* eslint-disable react/prop-types */
import { Image, useBreakpointValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { CARD_PRESETS, getCardImageStyles } from "../styles/cardStyles"

const MotionImage = motion(Image)

const PlayingCard = ({
  src,
  alt = "Playing card",
  isClickable = false,
  draggable = false,
  layoutId,
  metrics,
  onClick,
  onDragStart,
  onDragEnd,
  ...rest
}) => {
  const responsiveMetrics = useBreakpointValue(CARD_PRESETS) ?? CARD_PRESETS.md
  const cardMetrics = metrics ?? responsiveMetrics

  return (
    <MotionImage
      src={src}
      alt={alt}
      draggable={draggable}
      layout
      layoutId={layoutId}
      {...getCardImageStyles(cardMetrics, isClickable)}
      onClick={isClickable ? onClick : undefined}
      onDragStart={draggable ? onDragStart : undefined}
      onDragEnd={draggable ? onDragEnd : undefined}
      initial={false}
      transition={{ layout: { duration: 0.22, ease: "easeOut" } }}
      whileHover={isClickable ? { y: -4, scale: 1.03 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      {...rest}
    />
  )
}

export default PlayingCard