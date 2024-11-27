export const CARD_PRESETS = {
  base: { cardWidth: 52, cardHeight: 76, stackGap: 12, boardGap: 6 },
  sm: { cardWidth: 64, cardHeight: 94, stackGap: 16, boardGap: 8 },
  md: { cardWidth: 76, cardHeight: 112, stackGap: 22, boardGap: 10 },
  lg: { cardWidth: 90, cardHeight: 130, stackGap: 28, boardGap: 14 },
}

// export const CARD_RADIUS = "16px"
export const CARD_SHADOW = "0 10px 24px rgba(0, 0, 0, 0.26)"
export const CARD_HOVER_SHADOW = "0 18px 34px rgba(0, 0, 0, 0.36)"

export const getCardImageStyles = (metrics, isClickable = false) => ({
  w: `${metrics.cardWidth}px`,
  h: `${metrics.cardHeight}px`,
// borderRadius: CARD_RADIUS,
  display: "block",
  objectFit: "cover",
  boxShadow: CARD_SHADOW,
  transition: "transform 150ms ease, box-shadow 150ms ease, filter 150ms ease",
  cursor: isClickable ? "pointer" : "default",
  userSelect: "none",
  _hover: isClickable
    ? {
        transform: "translateY(-3px)",
        boxShadow: CARD_HOVER_SHADOW,
        filter: "saturate(1.05)",
      }
    : undefined,
})

export const BOARD_LAYOUT_PRESETS = {
  base: {
    pagePaddingX: 2,
    pagePaddingY: 3,
    surfaceGap: 4,
    railPaddingX: 3,
    railPaddingY: 3,
    railRadius: "2xl",
    boardPaddingX: 3,
    boardPaddingY: 4,
    boardRadius: "3xl",
  },
  sm: {
    pagePaddingX: 3,
    pagePaddingY: 4,
    surfaceGap: 5,
    railPaddingX: 4,
    railPaddingY: 4,
    railRadius: "2xl",
    boardPaddingX: 4,
    boardPaddingY: 5,
    boardRadius: "3xl",
  },
  md: {
    pagePaddingX: 4,
    pagePaddingY: 5,
    surfaceGap: 6,
    railPaddingX: 5,
    railPaddingY: 5,
    railRadius: "2xl",
    boardPaddingX: 6,
    boardPaddingY: 6,
    boardRadius: "3xl",
  },
  lg: {
    pagePaddingX: 6,
    pagePaddingY: 6,
    surfaceGap: 8,
    railPaddingX: 6,
    railPaddingY: 5,
    railRadius: "2xl",
    boardPaddingX: 8,
    boardPaddingY: 6,
    boardRadius: "3xl",
  },
}