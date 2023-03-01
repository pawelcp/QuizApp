import { useCountdown } from "../../src/hooks/useCountdown";
import {
  Box,
  Flex,
  Text,
  CircularProgress,
  Spacer,
  Grid,
  Button,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetQuestionsQuery } from "../../store/ApiSlice";
import {
  categoryId,
  difficultyLevel,
  categoryName,
} from "../../store/GameOptionsSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  incrementCorrect,
  incrementIncorrect,
  setGameQuestions,
  setUserAnswers,
} from "../../store/GameSlice";
import { useRouter } from "next/router";
import { decode } from "html-entities";
import AnswersMultitype from "../../src/components/Answers/AnswersMultiType";
import AnswersBoolean from "../../src/components/Answers/AnswersBoolean";

export default function quiz() {
  const router = useRouter();
  const selectedCategoryId = useSelector(categoryId);
  const selectedDifficultyLvl = useSelector(difficultyLevel);
  const name = useSelector(categoryName);

  const dispatch = useDispatch();

  const [numberQuestion, setNumberQuestion] = useState(0);
  const [progress, seconds] = useCountdown(30, numberQuestion);
  const [shuffledAnswer, setShuffledAnswer] = useState<any[]>([]);

  const { data } = useGetQuestionsQuery({
    categoryId: selectedCategoryId,
    difficultyLevel: selectedDifficultyLvl,
  });
  const question = data?.results[numberQuestion].question;

  setGameQuestions(data?.results);

  const shuffleAnswers = () => {
    if (data?.results[numberQuestion].type == "multiple") {
      const shuffleAnswer = [
        data?.results[numberQuestion].correct_answer,
        data?.results[numberQuestion].incorrect_answers[0],
        data?.results[numberQuestion].incorrect_answers[1],
        data?.results[numberQuestion].incorrect_answers[2],
      ];

      setShuffledAnswer(
        shuffleAnswer
          .map((answer) => ({ sort: Math.random(), value: answer }))
          .sort((a, b) => a.sort - b.sort)
          .map((obj) => obj.value)
      );
    } else {
      const shuffleAnswer = [
        data?.results[numberQuestion].correct_answer,
        data?.results[numberQuestion].incorrect_answers[0],
      ];

      setShuffledAnswer(
        shuffleAnswer
          .map((answer) => ({ sort: Math.random(), value: answer }))
          .sort((a, b) => a.sort - b.sort)
          .map((obj) => obj.value)
      );
    }
  };

  useEffect(() => {
    shuffleAnswers();
  }, [data, numberQuestion]);

  useEffect(() => {
    if (seconds === "00") {
      dispatch(incrementIncorrect());

      if (numberQuestion === 9) {
        router.push("/QuizView/quizResult").catch((err: any) => {
          throw new Error(err.message);
        });
      } else {
        setNumberQuestion(numberQuestion + 1);
      }
    }
  }, [seconds]);

  const checkEndHandler = (questionNumber?: number) => {
    if (questionNumber === 9) {
      router.push("/QuizView/quizResult").catch((err: any) => {
        throw new Error(err.message);
      });
    } else {
      setNumberQuestion(numberQuestion + 1);
    }
  };

  const checkAnswer = (answer?: string, questionNumber?: number) => {
    if (answer === data?.results[numberQuestion].correct_answer) {
      dispatch(incrementCorrect());
      checkEndHandler(questionNumber);
    } else {
      dispatch(incrementIncorrect());
      checkEndHandler(questionNumber);
    }
    setUserAnswers({ questionNumber: questionNumber, answer: answer });
  };
  const changeNumberQuestion = () => {
    setNumberQuestion(numberQuestion + 1);
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
              {decode(question)}
            </Text>
          </Box>
          <Spacer />
          <Box w="10vw" alignItems="center" justifyItems="center">
            <CircularProgress
              value={+progress}
              w="10vw"
              size="100%"
              thickness="5px"
              color="purple.500"
            >
              <CircularProgressLabel fontSize="3xl">{`${seconds}`}</CircularProgressLabel>
            </CircularProgress>
          </Box>
        </Flex>
      </Box>

      {data?.results[numberQuestion].type == "multiple" ? (
        <Grid
          mx="auto"
          mt="15%"
          w="90%"
          templateColumns="repeat(4, 1fr)"
          gap={2}
        >
          <Button
            onClick={() => {
              checkAnswer(shuffledAnswer[0], numberQuestion);
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
              checkAnswer(shuffledAnswer[1], numberQuestion);
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
              checkAnswer(shuffledAnswer[2], numberQuestion);
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
              checkAnswer(shuffledAnswer[3], numberQuestion);
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
      ) : (
        <Grid
          mx="auto"
          mt="15%"
          w="60%"
          templateColumns="repeat(2, 1fr)"
          gap={2}
        >
          <Button
            onClick={() => {
              checkAnswer(
                data?.results[numberQuestion].correct_answer,
                numberQuestion
              );
            }}
            textColor="white"
            fontSize="2xl"
            w="100%"
            h="30vh"
            colorScheme="yellow"
          >
            {data?.results[numberQuestion].correct_answer}
          </Button>
          <Button
            onClick={() => {
              checkAnswer(
                data?.results[numberQuestion].incorrect_answers.toString(),
                numberQuestion
              );
            }}
            textColor="white"
            fontSize="2xl"
            w="100%"
            h="30vh"
            colorScheme="purple"
          >
            {data?.results[numberQuestion].incorrect_answers.toString()}
          </Button>
        </Grid>
      )}
      {data?.results[numberQuestion].type == "multiple" ? (
        <AnswersMultitype
          numberQuestion={numberQuestion}
          shuffledAnswer={shuffledAnswer}
          checkAnswer={checkAnswer}
          setNumberQuestion={changeNumberQuestion}
        />
      ) : (
        <AnswersBoolean
          numberQuestion={numberQuestion}
          shuffledAnswer={shuffledAnswer}
          checkAnswer={checkAnswer}
          setNumberQuestion={changeNumberQuestion}
        />
      )}
    </Box>
  );
}
