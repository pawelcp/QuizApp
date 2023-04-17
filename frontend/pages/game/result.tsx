import { Avatar, Box, Button, Flex, Grid, GridItem, Spacer, Text, useDisclosure } from "@chakra-ui/react";
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
import ResultModal from "../../src/components/ResultModal";

export default function quizResult() {
  const correct = useSelector(correctAnswers);
  const incorrect = useSelector(incorrectAnswers);
  const name = useSelector(categoryName);
  const selectedDifficultyLevel = useSelector(difficultyLevel);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  

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
              textColor="white"
              fontSize="xl"
              bg="purple.500"
              shadow="2xl"
              w="15vw"
              h="9vh"
              mt='3'
              mx='5'
            >
              Home page <AiOutlineHome style={{ marginLeft: "6px" }} />
            </Button>
            <Spacer></Spacer>
            <Button
              onClick={() => {
                resetGameHandler("/userProfile");
              }}
              textColor="white"
              fontSize="xl"
              bg="purple.500"
              shadow="2xl"
              w="15vw"
              h="9vh"
              mt='3'
              mx='5'
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
      <Flex mx='auto' alignSelf='center' justifySelf='center' w='75vw' gap='10' my='10vh' flexDirection='column'>
             <Flex justifyItems='center' alignItems='center' h='10vh' w='100%'>
              <Flex h='100%' w='20%'  justifyItems='center' alignItems='center'>
                <Text fontWeight='bold' fontSize='3xl' color='green' mx='auto'>Correct {correct}</Text>
              </Flex>
              <Box h='50%' w='80%' rounded='md' bg='blackAlpha.400' shadow='2xl'>
                <Flex rounded='md' textAlign='center' alignItems='center' justifyContent='center' textColor='white' fontSize='2xl'  bg='green' h='100%' w={`${correct}0%`}><Text>{`${correct}0%`}</Text></Flex>
              </Box>
            </Flex>
            <Flex justifyItems='center' alignItems='center' h='10vh' w='100%'>
              <Flex h='100%' w='20%' justifyItems='center' alignItems='center'>
                <Text fontWeight='bold' fontSize='3xl' color='red' mx='auto'>Incorrect {incorrect}</Text>
              </Flex>
              <Box h='50%' w='80%' rounded='md' bg='blackAlpha.400' shadow='2xl'>
                <Flex rounded='md' alignItems='center' justifyContent='center' textAlign='center' textColor='white' fontSize='2xl' bg='red' h='100%' w={`${incorrect}0%`}><Text>{`${incorrect}0%`}</Text></Flex>
              </Box>
            </Flex>
      </Flex>
      <Flex h='10vh' my='2vh' justifyContent="center" alignItems="center">
        <Button p='5' onClick={onOpen}>View answers</Button>
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
      <ResultModal onClose={onClose} open={isOpen} />
    </Box>
  );
}
