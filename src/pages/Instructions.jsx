import { Box, Button, Container, Heading, VStack, Text, UnorderedList, ListItem, Icon } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { IoArrowBack, IoPlay } from "react-icons/io5"

const Instructions = () => {
  return (
    <Box 
      minH={'100vh'} 
      bg={'radial-gradient(circle, #1a472a 0%, #0d2b1a 100%)'}
      py={12}
    >
      <Container maxW="container.md">
         <VStack 
            spacing={8} 
            p={10} 
            bg="rgba(255, 255, 255, 0.05)" 
            backdropFilter="blur(10px)"
            borderRadius="3xl"
            border="1px solid rgba(255, 255, 255, 0.1)"
            align="stretch"
         >
            <Box display="flex" alignItems="center" gap={4}>
               <Button 
                  as={Link} 
                  to="/" 
                  variant="ghost" 
                  color="white" 
                  _hover={{ bg: 'rgba(255,255,255,0.1)' }}
               >
                  <Icon as={IoArrowBack} boxSize={6} />
               </Button>
               <Heading color="white" size="xl">How to Play</Heading>
            </Box>

            <VStack align="stretch" spacing={6}>
               <Box>
                  <Heading size="md" color="green.200" mb={3}>The Goal</Heading>
                  <Text color="whiteAlpha.900" fontSize="lg">
                     The aim of Solitaire is to organize all cards into four "Foundation" piles at the top of the screen. Each pile must be built from **Ace to King** by matching the suit (Hearts, Diamonds, Clubs, or Spades).
                  </Text>
               </Box>

               <Box>
                  <Heading size="md" color="green.200" mb={3}>Where the Cards Are</Heading>
                  <UnorderedList spacing={3} color="whiteAlpha.900" ml={6}>
                     <ListItem><Text as="span" fontWeight="bold" color="green.100">Tableau:</Text> The 7 columns in the middle. You move cards here to uncover hidden ones.</ListItem>
                     <ListItem><Text as="span" fontWeight="bold" color="green.100">Stock Pile:</Text> The face-down pile at the top-left. Click it to get new cards when you are stuck.</ListItem>
                     <ListItem><Text as="span" fontWeight="bold" color="green.100">Waste Pile:</Text> Cards you draw from the Stock appear here. You can play the top card from this pile.</ListItem>
                     <ListItem><Text as="span" fontWeight="bold" color="green.100">Foundations:</Text> The 4 empty slots at the top-right where you win the game.</ListItem>
                  </UnorderedList>
               </Box>

               <Box>
                  <Heading size="md" color="green.200" mb={3}>How to Move Cards</Heading>
                  <UnorderedList spacing={3} color="whiteAlpha.900" ml={6}>
                     <ListItem>
                        <Text fontWeight="bold" color="green.500">1. Opposite Colors:</Text> 
                        You can place a card on another card only if it is the **opposite color** (Red on Black, or Black on Red).
                     </ListItem>
                     <ListItem>
                        <Text fontWeight="bold" color="green.500">2. Descending Order:</Text> 
                        The card you move must be **one rank lower** than the one you place it on (e.g., a 9 goes on a 10).
                     </ListItem>
                     <ListItem>
                        <Text fontWeight="bold" color="green.500">3. Moving Groups:</Text> 
                        You can move a whole sequence of cards at once if they follow the rules above.
                     </ListItem>
                     <ListItem>
                        <Text fontWeight="bold" color="green.500">4. Empty Slots:</Text> 
                        Only a **King** (or a stack starting with a King) can be placed in an empty column on the Tableau.
                     </ListItem>
                     <ListItem>
                        <Text fontWeight="bold" color="green.500">5. Winning:</Text> 
                        Drag an Ace to the Foundation to start a pile. Follow it with the 2, 3, 4, etc., of that same suit.
                     </ListItem>
                  </UnorderedList>
               </Box>
            </VStack>

            <Button 
               as={Link} 
               to="/game" 
               colorScheme="green" 
               size="lg" 
               borderRadius="xl"
               mt={4}
               rightIcon={<Icon as={IoPlay} />}
            >
               Start Game
            </Button>
         </VStack>
      </Container>
    </Box>
  )
}

export default Instructions