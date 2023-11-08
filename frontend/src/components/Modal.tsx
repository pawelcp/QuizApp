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
  useBreakpointValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { resetGame } from "../../store/GameSlice";

import {
  setCategoryId,
  setCategoryName,
  setDifficultyLevel
} from "../../store/GameOptionsSlice";

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
    dispatch(setCategoryId(convertedId));
    dispatch(setDifficultyLevel(level));
    dispatch(setCategoryName(name));
    dispatch(resetGame());
    router.push("/game/game").catch((err) => {
      throw new Error("Something went wrong!");
    });
  };

  return (
    <Modal isOpen={open} onClose={onClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent p="2">
        <ModalHeader mx="auto" fontSize="2xl">
          Choose a difficulty level for your quiz
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                setLevel("easy");
              }}
              width="33%"
              opacity="0.7"
              fontSize="2xl"
              p="10"
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
              width="33%"
              opacity="0.7"
              fontSize="2xl"
              p="10"
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
              width="33%"
              onClick={() => {
                setLevel("hard");
              }}
              opacity="0.7"
              fontSize="2xl"
              p="10"
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
        <Center>
          <Button
            onClick={playHandler}
            color="white"
            bg="blackAlpha.800"
            fontSize="2xl"
            p="7"
            marginY="5"
            w="40%"
            _hover={{ bg: "black" }}
          >
            Start
          </Button>
        </Center>
      </ModalContent>
    </Modal>
  );
}
