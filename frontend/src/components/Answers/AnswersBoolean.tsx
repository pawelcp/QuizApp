import { Button, Grid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { decode } from "html-entities";
import { number } from "prop-types";

type GameProps = {
  numberQuestion: number;
  shuffledAnswer: string[];
  checkAnswer: (
    answer: string | undefined,
    numberQuestion: number | undefined
  ) => void;
  setNumberQuestion: () => void;
};

export default function AnswersBoolean({
  numberQuestion,
  shuffledAnswer,
  checkAnswer,
  setNumberQuestion,
}: GameProps) {
  const router = useRouter();

  return (
    <Grid mx="auto" mt="15%" w="60%" templateColumns="repeat(2, 1fr)" gap={2}>
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
    </Grid>
  );
}
