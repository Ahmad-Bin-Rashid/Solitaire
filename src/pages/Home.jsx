import { Box, Button, Center, Heading, VStack, Text, Container } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const Home = () => {
   return (
      <Box 
         minH={'100vh'} 
         bg={'radial-gradient(circle, #1a472a 0%, #0d2b1a 100%)'}
         display="flex"
         alignItems="center"
         justifyContent="center"
      >
         <Container maxW="container.md" centerContent>
            <VStack 
               spacing={10} 
               p={12} 
               bg="rgba(255, 255, 255, 0.05)" 
               backdropFilter="blur(10px)"
               borderRadius="3xl"
               border="1px solid rgba(255, 255, 255, 0.1)"
               boxShadow="2xl"
            >
               <VStack spacing={2}>
                  <Heading 
                     fontSize={{ base: "5xl", md: "7xl" }} 
                     color="white"
                     letterSpacing="wider"
                     textShadow="0 4px 12px rgba(0,0,0,0.3)"
                  >
                     SOLITAIRE
                  </Heading>
                  <Text color="green.200" fontSize="lg" fontWeight="medium">
                     The Classic Card Game
                  </Text>
               </VStack>

               <VStack spacing={4} w="full">
                  <Button 
                     as={Link} 
                     to={'/game'} 
                     size="lg"
                     w="full"
                     py={8}
                     fontSize="xl"
                     colorScheme="green"
                     variant="solid"
                     borderRadius="xl"
                     _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  >
                     Play Game
                  </Button>
                  <Button 
                     as={Link} 
                     to={'/instructions'} 
                     size="lg"
                     w="full"
                     py={8}
                     fontSize="xl"
                     color="white"
                     variant="outline"
                     borderColor="rgba(255,255,255,0.3)"
                     borderRadius="xl"
                     _hover={{ bg: 'rgba(255,255,255,0.1)' }}
                  >
                     Instructions
                  </Button>
               </VStack>
            </VStack>
         </Container>
      </Box>
   )
}

export default Home