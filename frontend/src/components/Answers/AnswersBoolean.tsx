import { Button, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { decode } from "html-entities";

type GameProps = {
    numberQuestion: number,
    shuffledAnswer: string[],
    checkAnswer: (answer:string) => void,
    setNumberQuestion: () => void

}

export default function AnswersBoolean({numberQuestion, shuffledAnswer, checkAnswer, setNumberQuestion}: GameProps) {

    
    const router = useRouter()

    return(
        <Grid
          mx="auto"
          mt="15%"
          w="60%"
          templateColumns="repeat(2, 1fr)"
          gap={2}
        >
          <Button
            onClick={() => {
              checkAnswer(shuffledAnswer[0]);
              if (numberQuestion === 9) {
                router.push("/QuizView/quizResult");
              } else {
                setNumberQuestion()
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
                setNumberQuestion()
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
        </Grid>
    )
}