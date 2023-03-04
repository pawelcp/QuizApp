import { Button, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { decode } from "html-entities";

type GameProps = {
    shuffledAnswer: string[],
    checkAnswer: (answer:string) => void,
    checkEndHandler: () => void

}

export default function AnswersMultiType({ shuffledAnswer, checkAnswer, checkEndHandler}: GameProps) {

    const router = useRouter()

    return(
        <Grid
          mx="auto"
          mt="15%"
          w="90%"
          templateColumns="repeat(4, 1fr)"
          gap={2}
        >
          <Button
            onClick={() => {
              checkAnswer(shuffledAnswer[0]);
              checkEndHandler()
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
              checkEndHandler()
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
              checkEndHandler()
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
              checkEndHandler()
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
    )
}