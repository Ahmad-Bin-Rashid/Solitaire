/* eslint-disable react/prop-types */
import { Image, useBreakpointValue } from "@chakra-ui/react"
import { CARD_PRESETS, getCardImageStyles } from "../styles/cardStyles"

const PlayingCard = ({
  src,
  alt = "Playing card",
  isClickable = false,
  metrics,
  onClick,
  ...rest
}) => {
  const responsiveMetrics = useBreakpointValue(CARD_PRESETS) ?? CARD_PRESETS.md
  const cardMetrics = metrics ?? responsiveMetrics

  return (
    <Image
      src={src}
      alt={alt}
      draggable={false}
      {...getCardImageStyles(cardMetrics, isClickable)}
      onClick={isClickable ? onClick : undefined}
      {...rest}
    />
  )
}

export default PlayingCard