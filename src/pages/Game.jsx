import { Box, Button, HStack, Image, Spacer, VStack } from "@chakra-ui/react"
import useGameState from "../hooks/useGameState";

const Game = () => {

  const { state, dispatch } = useGameState();

  const handleImage = (e) => {
    console.log(state);
    console.log(dispatch);
  }

  const tableauPiles = state.tableauPiles;

  return (
  
    <Box backgroundImage={'background.jpg'} minH={'100vh'} width={'100%'}>
      
      <VStack >
         <HStack borderBottom={'1px'} h={'20%'} w={'80%'} my={2} mx={'30%'} padding={'3'}>
            <HStack >
              <Image onClick={(e) => handleImage(e)} src="red-joker.png" height={'120px'}/>
              <Image  src="red-joker.png" height={'120px'}/>
              <Image  src="black-joker.png" height={'120px'}/>
              <Image  src="black-joker.png" height={'120px'}/>
            </HStack>
            <Spacer/>
            <HStack >
              <Image  src="card-bg.png" height={'140px'}/>
              <Image  src="card-bg.png" height={'140px'}/>

            </HStack>
         </HStack>

         <HStack  w={'60%'}>
            {tableauPiles && tableauPiles.map((pile) => (
              <VStack key={pile} ><Image src="pile."></Image></VStack>
            ))}
            {/* <VStack >
              <Image  src="card-bg.png" height={'140px'}/>
            </VStack>

            <VStack >
              <Image  src="card-bg.png" height={'140px'}/>
              <Image  src="card-bg.png" height={'140px'}/>
            </VStack>

            <VStack >
              <Image  src="card-bg.png" height={'140px'}/>
              <Image  src="card-bg.png" height={'140px'}/>
              <Image  src="card-bg.png" height={'140px'}/>
            </VStack>
            <VStack >
              <Image  src="card-bg.png" height={'140px'}/>
            </VStack>
            <VStack >
              <Image  src="card-bg.png" height={'140px'}/>
            </VStack>
            <VStack >
              <Image  src="card-bg.png" height={'140px'}/>
            </VStack>
            <VStack >
              <Image  src="card-bg.png" height={'140px'}/>
              <Image  src="card-bg.png" height={'140px'}/>
            </VStack> */}
         </HStack>
      </VStack>
    </Box>
  )
}

export default Game