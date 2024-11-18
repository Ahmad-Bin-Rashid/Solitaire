/* eslint-disable react/prop-types */
import { Image } from "@chakra-ui/react"

const StockPile = ({cards}) => {
  return (
    <Image 
      src={cards.isEmpty() ? "blank-card.png" : "card-bg.png"}
      h={'130px'} 
      width={'auto'}
      cursor={'pointer'}
      _hover={cards.peek() ? { shadow: '2xl', border: '1px', borderColor: 'brown' } : {}}
      />
  )
}

export default StockPile