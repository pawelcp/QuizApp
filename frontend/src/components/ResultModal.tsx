import {
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalHeader,
    ModalContent,
    ModalBody,
    Flex,
    OrderedList,
    ListItem,
  } from "@chakra-ui/react";
import { useSelector } from "react-redux";
  import {
    correctAnswers,
    getGameQuestions,
    incorrectAnswers,
  } from "../../store/GameSlice";
  import { decode } from "html-entities";
  

  
  type ModalProps = {
    onClose: () => void;
    open: boolean;
  };
  
  export default function ResultModal({ onClose, open }: ModalProps) {
  
    const gameQuestions = useSelector(getGameQuestions);
    
    
    
  
    return (
      <Modal isOpen={open} onClose={onClose} size='6xl' isCentered>
        <ModalOverlay />
        <ModalContent p="2">
          <ModalHeader fontSize="2xl">
            <OrderedList>
            {gameQuestions.map((question)=>{
             return <ListItem py='4' fontSize='lg'>{decode(question.question)}</ListItem>
            }
            )
            }
            
            </OrderedList>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent="center" alignItems="center">
              
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  