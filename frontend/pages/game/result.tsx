import { Avatar, Box, Button, Flex, Grid, GridItem, Spacer, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { useSelector } from "react-redux";
import {
  correctAnswers,
  getGameQuestions,
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
  const questions = useSelector(getGameQuestions);
  

  const resetGameHandler = (url: string) => {
    dispatch(resetGame());
    router.push(url).catch((err) => {
      throw new Error(err.message);
    });
  };

  console.log(questions);
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
      <Flex mx='auto' alignSelf='center' justifySelf='center' w='90vw' gap='10' my='10vh' flexDirection='column'>
             <Flex justifyItems='center' alignItems='center' h='10vh' w='100%'>
              <Box h='100%' bg='green' w='20%'>qwe</Box>
              <Box h='50%' bg='red' w='80%'>qwe</Box>
            </Flex>
            <Flex justifyItems='center' alignItems='center' h='10vh' w='100%'>
              <Box h='100%' bg='green' w='20%'>qwe</Box>
              <Box h='50%' bg='red' w='80%'>qwe</Box>
            </Flex>
      </Flex>
      <Flex h='10vh' my='2vh' justifyContent="center" alignItems="center">
        <Button >view correct answers</Button>
      </Flex>
      <Box mt="5vh">
        <Flex alignItems="center" justifyContent="center">
          <Button
            onClick={() => {
              resetGameHandler("/game/game");
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
