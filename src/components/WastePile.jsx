/* eslint-disable react/prop-types */
import { Image } from "@chakra-ui/react"

const WastePile = ({cards}) => {
   console.log(cards)
  return (
   <Image 
      src={cards.peek() ? `${cards.peek().rank}-${cards.peek().suit}.png` : 'blank-card.png'} 
      height={'120px'} 
      width={'auto'}
      cursor={cards.peek() ? 'pointer' : 'default'}
      _hover={cards.peek() ? { shadow: '2xl', border: '1px', borderColor: 'brown' } : {}}
      />
  )
}

export default WastePile