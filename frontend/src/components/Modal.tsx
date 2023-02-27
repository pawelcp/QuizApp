import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalBody,
  Flex,
  Button,
  Center,
  ModalFooter,
} from "@chakra-ui/react";
import styles from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { pushCategoryId, pushDifficultyLevel, pushCategoryName } from "../../store/selectSlice";
import { useRouter } from "next/router";

type ModalProps = {
  onClose: () => void;
  open: boolean;
  name: string;
  id: number;
};

export default function ModalElement({ onClose, open, name, id }: ModalProps) {
  const dispatch = useDispatch();
  const [level, setLevel] = useState("");
  const router = useRouter();
  const changeLevelHandler = (difficultyLevel: string) => {
    setLevel(difficultyLevel);
  };

  const convertedId = id.toString();

  const playHandler = () => {
    dispatch(
      pushCategoryId({
        categoryId: convertedId,
      })
    );
    dispatch(
      pushDifficultyLevel({
        difficultyLevel: level,
      })
    );
    dispatch(
      pushCategoryName({
        categoryName: name
      })
    )
    console.log(id, name);
    router.push("/QuizView/quizView");
  };

  return (
    <Modal isOpen={open} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent mt="30vh" pb="8">
        <ModalHeader>Choose a difficulty level for {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent="center">
            <Button
              onClick={() => {
                setLevel("easy");
              }}
              opacity="0.7"
              fontSize="3xl"
              p="8%"
              colorScheme="green"
              m="1"
              _active={{
                bg: "green",
                transform: "scale(0.98)",
                borderColor: "#bec3c9",
              }}
              _focus={{ bg: "green", opacity: "1" }}
            >
              Easy
            </Button>
            <Button
              onClick={() => {
                setLevel("medium");
              }}
              opacity="0.7"
              fontSize="3xl"
              px="5%"
              py="8%"
              colorScheme="orange"
              _active={{
                bg: "orange",
                transform: "scale(0.98)",
                borderColor: "#bec3c9",
              }}
              _focus={{ bg: "orange", opacity: "1" }}
              m="1"
            >
              Medium
            </Button>
            <Button
              onClick={() => {
                setLevel("hard");
              }}
              opacity="0.7"
              fontSize="3xl"
              p="8%"
              colorScheme="red"
              m="1"
              _active={{
                bg: "red",
                transform: "scale(0.98)",
                borderColor: "#bec3c9",
              }}
              _focus={{ bg: "red", opacity: "1" }}
            >
              Hard
            </Button>
          </Flex>
        </ModalBody>
        <Flex justifyContent="center">
          <Button
            onClick={playHandler}
            color="white"
            bg="blackAlpha.800"
            fontSize="2xl"
            p="5%"
            mt="2"
            w="10vw"
            _hover={{ bg: "black" }}
          >
            Start
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
    // <Modal onClose={onClose} isOpen={open} isCentered size="lg">
    //   <ModalOverlay />
    //   <ModalContent>
    //     <ModalHeader>Choose options for your Quiz: {name}</ModalHeader>
    //     <ModalCloseButton />
    //     <ModalBody paddingY="10">
    //       <Flex
    //         width="full"
    //         alignItems="center"
    //         justifyContent="center"
    //         flexDirection="column"
    //         gap="5"
    //       >
    //         <button
    //           className={`${styles.button} ${styles.easy}`}
    //           onClick={() => {
    //             changeLevelHandler("easy");
    //           }}
    //         >
    //           Easy
    //         </button>
    //         <button
    //           className={`${styles.button} ${styles.medium}`}
    //           onClick={() => {
    //             changeLevelHandler("medium");
    //           }}
    //         >
    //           Medium
    //         </button>
    //         <button
    //           className={`${styles.button} ${styles.hard}`}
    //           onClick={() => {
    //             changeLevelHandler("hard");
    //           }}
    //         >
    //           Hard
    //         </button>
    //       </Flex>
    //       {/* <Flex justifyContent="center" alignItems="center" gap="8">
    //         <Button minWidth="32" color="#FFF" size="lg" backgroundColor="#01B636">Easy</Button>
    //         <Button minWidth="32" color="#FFF" size="lg" backgroundColor="#F0C326">Medium</Button>
    //         <Button minWidth="32" color="#FFF" size="lg" backgroundColor="#FF3C1F">Hard</Button>
    //       </Flex> */}
    //     </ModalBody>
    //     <ModalFooter>
    //       <Center width="full" marginX="auto">
    //         <button
    //           onClick={playHandler}
    //           className={`${styles.button} ${styles["play-again"]}`}
    //         >
    //           Play!
    //         </button>
    //       </Center>
    //     </ModalFooter>
    //   </ModalContent>
    // </Modal>
  );
}
