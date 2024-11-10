import { Image } from "@chakra-ui/react"


const Tableau = (pile) => {

   const cards = pile.cards.getCards()
   return (
      <>
         {cards && cards.map(({ card }) => (
            <Image 
               key={card.rank + card.suit} 
               src={card.faceUp ? `${card.rank}-${card.suit}.png` : "card-bg.png"} 
               height={'120px'} 
               width={'auto'} 
               cursor={card.faceUp ? 'pointer' : 'default'}
               _hover={card.faceUp ? { shadow: '2xl', border: '1px', borderColor: 'brown'} : {}}
               
               />

         ))}
      </>
   )
}

export default Tableau