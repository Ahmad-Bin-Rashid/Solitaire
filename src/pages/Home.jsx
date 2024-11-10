import { Box, Button, Center, Heading, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const Home = () => {
   return (
      <Box minH={'100vh'} bg={'orange.900'}>
         <Heading textAlign={'center'} p={'7'}>Solitaire</Heading>
         <Box h={'md'} alignContent={'center'}>
            <Center>
               <VStack spacing={5}>
                  <Button as={Link} to={'/game'} variant={'outline'} colorScheme="gray">Play Game</Button>
                  <Button as={Link} to={'/instructions'} variant={'outline'}>Instructions</Button>
               </VStack>
            </Center>
         </Box>
      </Box>
   )
}

export default Home