import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalBody,
  Flex,
  Center,
  ModalFooter,
} from "@chakra-ui/react";
import styles from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { pushCategoryId, pushDifficultyLevel } from "../../store/selectSlice";
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

  const playHandler = () => {
    dispatch(pushCategoryId(id));
    dispatch(pushDifficultyLevel(level));
    router.push("/quizview");
  };

  return (
    <Modal onClose={onClose} isOpen={open}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose options for your Quiz: {name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingY="10">
          <Flex
            width="full"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap="5"
          >
            <button
              className={`${styles.button} ${styles.easy}`}
              onClick={() => {
                changeLevelHandler("easy");
              }}
            >
              Easy
            </button>
            <button
              className={`${styles.button} ${styles.medium}`}
              onClick={() => {
                changeLevelHandler("medium");
              }}
            >
              Medium
            </button>
            <button
              className={`${styles.button} ${styles.hard}`}
              onClick={() => {
                changeLevelHandler("hard");
              }}
            >
              Hard
            </button>
          </Flex>
          {/* <Flex justifyContent="center" alignItems="center" gap="8">
            <Button minWidth="32" color="#FFF" size="lg" backgroundColor="#01B636">Easy</Button>
            <Button minWidth="32" color="#FFF" size="lg" backgroundColor="#F0C326">Medium</Button>
            <Button minWidth="32" color="#FFF" size="lg" backgroundColor="#FF3C1F">Hard</Button>
          </Flex> */}
        </ModalBody>
        <ModalFooter>
          <Center width="full" marginX="auto">
            <button
              onClick={playHandler}
              className={`${styles.button} ${styles["play-again"]}`}
            >
              Play!
            </button>
          </Center>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
