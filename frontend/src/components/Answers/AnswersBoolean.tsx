import { Button, Grid, Text, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { decode } from "html-entities";

type GameProps = {
    shuffledAnswer: string[],
    checkAnswer: (answer:string) => void,
    checkEndHandler: () => void

}

export default function AnswersBoolean({ shuffledAnswer, checkAnswer, checkEndHandler}: GameProps) {

    
    const router = useRouter()

    return(
      <Flex w='60vw' flexDirection={{base:'column', sm:'row'}} gap='2%' h={{base:'65vh', sm:'45vh'}} alignSelf='center' justifySelf='center'>
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
        </Flex>
    )
}