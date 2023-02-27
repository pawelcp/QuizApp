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
  CircularProgressLabel,
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
import AnswersMultitype from "../../src/components/Answers/AnswersMultiType";
import AnswersBoolean from "../../src/components/Answers/AnswersBoolean"

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
  
  console.log(quizRes?.results[numberQuestion].correct_answer);
  

  const shuffleAnswers = () => {
    if(quizRes?.results[numberQuestion].type == "multiple"){
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
    )}else{
      const shuffleAnswer = [
        quizRes?.results[numberQuestion].correct_answer,
        quizRes?.results[numberQuestion].incorrect_answers[0],
      ];
  
      setShuffledAnswer(
        shuffleAnswer
          .map((answer) => ({ sort: Math.random(), value: answer }))
          .sort((a, b) => a.sort - b.sort)
          .map((obj) => obj.value)
      )
    }
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
  const changeNumberQuestion = () => {
    setNumberQuestion(numberQuestion +1)
  }

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
          <Box
            w="10vw"
            alignItems="center"
            justifyItems="center"
          >
            <CircularProgress
              value={+progress}
              w="10vw"
              size="100%"
              thickness="5px"
              color="purple.500">
                <CircularProgressLabel fontSize='3xl'>{`${seconds}`}</CircularProgressLabel>
            </CircularProgress>
          </Box>
        </Flex>
      </Box>
      {quizRes?.results[numberQuestion].type == "multiple" ? (
       <AnswersMultitype numberQuestion={numberQuestion} shuffledAnswer={shuffledAnswer} checkAnswer={checkAnswer} setNumberQuestion={changeNumberQuestion} />) 
       : (<AnswersBoolean numberQuestion={numberQuestion} shuffledAnswer={shuffledAnswer} checkAnswer={checkAnswer} setNumberQuestion={changeNumberQuestion} />
      )}
    </Box>
  );
}
