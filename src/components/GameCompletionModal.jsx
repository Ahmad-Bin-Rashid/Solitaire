/* eslint-disable react/prop-types */
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const GameCompletionModal = ({ isOpen, onClose }) => {

   // const { isOpen, onClose } = useDisclosure()
  return (
   <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered >
   <ModalOverlay />
   <ModalContent>
     <ModalHeader textAlign={'center'} mt={'3'} fontSize={'2xl'}>Congratulations!</ModalHeader>
     
     <ModalBody pb={6} textAlign={'center'} my={'7'}>
     🎉 You have successfully completed the game! 🎉
     </ModalBody>

   </ModalContent>
 </Modal>

  )
}

export default GameCompletionModal