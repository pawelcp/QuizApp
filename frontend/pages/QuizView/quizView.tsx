import { useCounter } from "@chakra-ui/counter";
import { useCountdown } from "../../src/hooks/useCountdown";
import {
  Box,
  Flex,
  Text,
  CircularProgress,
  Spacer,
  Grid,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetQuizByParamsQuery } from "../../store/apiSlice";
import {
  selectedCategoryId,
  selectedDifficultyLevel,
} from "../../store/selectSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  incrementCorrect,
  incrementIncorrect,
} from "../../store/quizViewSlice";
import { useRouter } from "next/router";
import { decode } from "html-entities";

export default function quiz() {
  const router = useRouter();
  const selectedCategoryID = useSelector(selectedCategoryId);
  const selectedDifficultyLvl = useSelector(selectedDifficultyLevel);

  const dispach = useDispatch();

  const [numberQuestion, setNumberQuestion] = useState(0);
  const [progress, seconds] = useCountdown(30, numberQuestion);
  const [shuffledAnswer, setShuffledAnswer] = useState<any[]>([]);

  const { data: quizRes } = useGetQuizByParamsQuery({
    categoryId: selectedCategoryID.categoryId,
    difficultyLevel: selectedDifficultyLvl.difficultyLevel,
  });

  const resQuestion = quizRes?.results[numberQuestion].question;

  const shuffleAnswers = () => {
    const shuffleAnswer = [
      quizRes?.results[numberQuestion].correct_answer,
      quizRes?.results[numberQuestion].incorrect_answers[0],
      quizRes?.results[numberQuestion].incorrect_answers[1],
      quizRes?.results[numberQuestion].incorrect_answers[2],
    ];

    setShuffledAnswer(
      shuffleAnswer
        .map((answer) => ({ sort: Math.random(), value: answer }))
        .sort((a, b) => a.sort - b.sort)
        .map((obj) => obj.value)
    );
  };

  useEffect(() => {
    shuffleAnswers();
  }, [quizRes, numberQuestion]);

  useEffect(() => {
    if (seconds === "00") {
      dispach(incrementIncorrect());

      if (numberQuestion === 9) {
        router.push("/QuizView/quizResult");
      } else {
        setNumberQuestion(numberQuestion + 1);
      }
    }
  }, [seconds]);

  const checkAnswer = (answer: string) => {
    if (answer === quizRes?.results[numberQuestion].correct_answer) {
      dispach(incrementCorrect());
    } else {
      dispach(incrementIncorrect());
    }
  };

  return (
    <Box>
      <Box
        rounded="xl"
        bg="white"
        p={[1, 8]}
        my="4"
        w="95%"
        mx="auto"
        shadow="2xl"
        mt="5%"
      >
        <Flex flexDirection="row" width="100%" alignItems="center">
          <Box w="70vw">
            <Text textAlign="center" fontSize="3xl">
              {decode(resQuestion)}
            </Text>
          </Box>
          <Spacer />
          <Text
            justifySelf="center"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
          >{`${seconds}`}</Text>
          <Box
            w="10vw"
            right="5%"
            top="5%"
            alignItems="center"
            justifyItems="center"
          >
            <CircularProgress
              value={progress}
              w="10vw"
              size="100px"
              thickness="4px"
            />
          </Box>
        </Flex>
      </Box>
      <Grid mx="auto" mt="15%" w="90%" templateColumns="repeat(4, 1fr)" gap={2}>
        <Button
          onClick={() => {
            checkAnswer(shuffledAnswer[0]);
            if (numberQuestion === 9) {
              router.push("/QuizView/quizResult");
            } else {
              setNumberQuestion(numberQuestion + 1);
            }
          }}
          textColor="white"
          fontSize="2xl"
          w="100%"
          h="30vh"
          colorScheme="yellow"
        >
          {decode(shuffledAnswer[0])}
        </Button>
        <Button
          onClick={() => {
            checkAnswer(shuffledAnswer[1]);
            if (numberQuestion === 9) {
              router.push("/QuizView/quizResult");
            } else {
              setNumberQuestion(numberQuestion + 1);
            }
          }}
          textColor="white"
          fontSize="2xl"
          w="100%"
          h="30vh"
          colorScheme="purple"
        >
          {decode(shuffledAnswer[1])}
        </Button>
        <Button
          onClick={() => {
            checkAnswer(shuffledAnswer[2]);
            if (numberQuestion === 9) {
              router.push("/QuizView/quizResult");
            } else {
              setNumberQuestion(numberQuestion + 1);
            }
          }}
          textColor="white"
          fontSize="2xl"
          w="100%"
          h="30vh"
          colorScheme="blue"
        >
          {decode(shuffledAnswer[2])}
        </Button>
        <Button
          onClick={() => {
            checkAnswer(shuffledAnswer[3]);
            if (numberQuestion === 9) {
              router.push("/QuizView/quizResult");
            } else {
              setNumberQuestion(numberQuestion + 1);
            }
          }}
          textColor="white"
          fontSize="2xl"
          w="100%"
          h="30vh"
          colorScheme="cyan"
        >
          {decode(shuffledAnswer[3])}
        </Button>
      </Grid>
    </Box>
  );
}
