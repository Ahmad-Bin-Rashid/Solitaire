/* eslint-disable react/prop-types */
import { 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalHeader, 
  ModalOverlay,
  Button,
  VStack,
  Text,
  Icon
} from "@chakra-ui/react"
import { IoRefresh } from "react-icons/io5"

const GameCompletionModal = ({ isOpen, onClose, onRestart }) => {
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
      <ModalContent 
        bg="linear-gradient(135deg, rgba(26, 71, 42, 0.95) 0%, rgba(13, 43, 26, 0.95) 100%)"
        border="1px solid rgba(168, 255, 214, 0.2)"
        boxShadow="0 24px 70px rgba(0, 0, 0, 0.5)"
        backdropFilter="blur(16px)"
        borderRadius="2xl"
        color="white"
        p={6}
      >
        <ModalHeader textAlign="center" fontSize="3xl" fontWeight="bold" color="green.100">
          Congratulations!
        </ModalHeader>
        
        <ModalBody pb={6}>
          <VStack spacing={8}>
            <Text fontSize="xl" textAlign="center" color="whiteAlpha.900">
              🎉 You have successfully completed the game! 🎉
            </Text>
            
            <Button
              size="lg"
              colorScheme="green"
              bg="green.400"
              color="gray.900"
              _hover={{ bg: "green.300", transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(72, 187, 120, 0.4)" }}
              _active={{ bg: "green.500", transform: "translateY(0)" }}
              transition="all 0.2s"
              leftIcon={<Icon as={IoRefresh} />}
              onClick={onRestart}
              w="full"
              maxW="200px"
              fontWeight="bold"
            >
              Play Again
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default GameCompletionModal