import { useCounter } from "@chakra-ui/counter";
import { useCountdown } from "../../src/hooks/useCountdown";
import {
  Box,
  Flex,
  Progress,
  Text,
  CircularProgress,
  Spacer,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetQuizByParamsQuery } from "../../store/apiSlice";
import {
  selectedCategoryId,
  selectedDifficultyLevel,
} from "../../store/selectSlice";
import { useDispatch, useSelector } from "react-redux";
import { correctState, incorrectState } from "../../store/quizViewSlice";
import {
  incrementCorrect,
  incrementIncorrect,
} from "../../store/quizViewSlice";
import { useRouter } from "next/router";


export default function quiz() {
  const router = useRouter();
  const selectedCategoryID = useSelector(selectedCategoryId);
  const selectedDifficultyLvl = useSelector(selectedDifficultyLevel);
  const correct = useSelector(correctState);
  const IncorrectState = useSelector(incorrectState);
  const dispach = useDispatch();

  const [numberQuestion, setNumberQuestion] = useState(0);
  const [progress, seconds] = useCountdown(30, numberQuestion);
  const [shuffledAnswer, setShuffledAnswer] = useState<any[]>([]);
  const [answer, setAnswer] = useState("");

  const { data: quizRes } = useGetQuizByParamsQuery({
    categoryId: selectedCategoryID.categoryId,
    difficultyLevel: selectedDifficultyLvl.difficultyLevel,
  });

  console.log(quizRes?.results[numberQuestion].type);
  
  
  const resQuestion = quizRes?.results[numberQuestion].question
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, "'")
    .replace(/&ldquo;/, "“")
    .replace(/&eacute;/, "é")
    .replace(/&rdquo;/, "”")
    .replace(/&quot;/, "'")
    .replace(/&rsquo;/, "'")
    .replace(/&lsquo;/, "'")



  const shuffleAnswers = () => {
    const shuffleAnswer = [
      quizRes?.results[numberQuestion].correct_answer,
      quizRes?.results[numberQuestion].incorrect_answers[0],
      quizRes?.results[numberQuestion].incorrect_answers[1],
      quizRes?.results[numberQuestion].incorrect_answers[2]
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
  
  

  const checkAnswer = (answer: any) => {
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
              {resQuestion}
            </Text>
          </Box>
          <Spacer></Spacer>
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
      {quizRes?.results[numberQuestion].type == 'multiple'? 
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
          {shuffledAnswer[0]}
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
          {shuffledAnswer[1]}
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
          {shuffledAnswer[2]}
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
          {shuffledAnswer[3]}
        </Button>
      </Grid>:
      <Grid mx="auto" mt="15%" w="60%" templateColumns="repeat(2, 1fr)" gap={2}>
        <Button
          onClick={() => {
            checkAnswer(quizRes?.results[numberQuestion].correct_answer);
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
          {quizRes?.results[numberQuestion].correct_answer}
        </Button>
        <Button
          onClick={() => {
            checkAnswer(quizRes?.results[numberQuestion].incorrect_answers);
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
          {quizRes?.results[numberQuestion].incorrect_answers}
        </Button>
      </Grid>
      }
      
    </Box>
  );
}
