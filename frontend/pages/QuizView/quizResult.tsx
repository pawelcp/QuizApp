import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  correctAnswers,
  incorrectAnswers,
  resetGame,
} from "../../store/GameSlice";
import { difficultyLevel, categoryName } from "../../store/GameOptionsSlice";
import { useDispatch } from "react-redux";

export default function quizResult() {
  const correct = useSelector(correctAnswers);
  const incorrect = useSelector(incorrectAnswers);
  const name = useSelector(categoryName);
  const selectedDifficultyLevel = useSelector(difficultyLevel);

  const router = useRouter();
  const dispatch = useDispatch();

  const resetGameHandler = (url: string) => {
    dispatch(resetGame());
    router.push(url).catch((err) => {
      throw new Error(err.message);
    });
  };


  return (
    <Box>
      <Box>
        <Box mt="2vh">
          <Flex alignItems="center" justifyContent="center">
            <Button
              onClick={() => {
                resetGameHandler("/");
              }}
              fontSize="xl"
              bg="white"
              shadow="2xl"
              border="2px"
              mr="30vw"
              w="15vw"
              h="9vh"
            >
              Home page <AiOutlineHome style={{ marginLeft: "6px" }} />
            </Button>
            <Button
              onClick={() => {
                resetGameHandler("/userProfile");
              }}
              fontSize="xl"
              bg="white"
              shadow="2xl"
              border="2px"
              ml="30vw"
              w="15vw"
              h="9vh"
            >
              Your profile <Avatar size="sm" ml="4"></Avatar>
            </Button>
          </Flex>
        </Box>
        <Flex alignItems="center" justifyContent="center">
          <Box>
            <Text
              w="50vw"
              mt="3vh"
              textAlign="center"
              fontSize="3xl"
              fontWeight="bold"
            >
              Category:
            </Text>
            <Text w="50vw" textAlign="center" fontSize="4xl" fontWeight="bold">
              {name}
            </Text>
          </Box>
          <Box>
            <Text
              w="50vw"
              mt="3vh"
              textAlign="center"
              fontSize="3xl"
              fontWeight="bold"
            >
              Difficulty Level:
            </Text>
            <Text
              w="50vw"
              textAlign="center"
              textColor={
                selectedDifficultyLevel === "easy"
                  ? "green"
                  : selectedDifficultyLevel === "medium"
                  ? "yellow.400"
                  : "red"
              }
              fontSize="4xl"
              textTransform="uppercase"
              fontWeight="bold"
            >
              {selectedDifficultyLevel}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box mt="15vh" h="27vh">
        <Flex alignItems="end" h="27vh" justifyContent="center">
          <Box
            rounded="md"
            mr="9.5vw"
            h={`${correct}0%`}
            w="5vw"
            bg="green"
          ></Box>
          <Box
            rounded="md"
            ml="9.5vw"
            h={`${incorrect}0%`}
            w="5vw"
            bg="red"
          ></Box>
        </Flex>
      </Box>
      <Box>
        <Flex alignItems="center" justifyContent="center">
          <Box
            fontSize="xl"
            textColor="green"
            fontWeight="bold"
            textAlign="center"
            rounded="md"
            mr="9vw"
            w="6vw"
          >
            Correct
          </Box>
          <Box
            fontSize="xl"
            textColor="red"
            fontWeight="bold"
            textAlign="center"
            rounded="md"
            ml="9vw"
            w="6vw"
          >
            Incorrect
          </Box>
        </Flex>
      </Box>
      <Box>
        <Flex alignItems="center" justifyContent="center">
          <Box
            fontSize="4xl"
            textColor="green"
            fontWeight="bold"
            textAlign="center"
            rounded="md"
            mr="9vw"
            w="6vw"
          >
            {correct}
          </Box>
          <Box
            fontSize="4xl"
            textColor="red"
            fontWeight="bold"
            textAlign="center"
            rounded="md"
            ml="9vw"
            w="6vw"
          >
            {incorrect}
          </Box>
        </Flex>
      </Box>
      <Box mt="5vh">
        <Flex alignItems="center" justifyContent="center">
          <Button
            onClick={() => {
              resetGameHandler("/QuizView/quizView");
            }}
            textColor="white"
            fontSize="xl"
            bg="purple.500"
            shadow="2xl"
            w="15vw"
            h="9vh"
          >
            Play again
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
