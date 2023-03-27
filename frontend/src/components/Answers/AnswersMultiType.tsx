import { Button, Grid, Box, Flex, useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
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
    const [isLargerThan1280] = useMediaQuery('(min-width: 480px)')

    const templateColumns = useBreakpointValue({
      xs: "repeat(2, 2fr)",
      sm: "repeat(2, 2fr)",
      md: "repeat(2, 2fr)",
      lg: "repeat(4, 1fr)",
    });

    return(
      <Flex flexDirection='column' h='65vh'>
        <Grid
          mx="auto"
          w="90%"
          templateColumns={templateColumns}
          gap={2}
          my='auto'
          maxH='65vh'
        >
          <Button
            onClick={() => {
              checkAnswer(shuffledAnswer[0]);
              checkEndHandler()
            }}
            textColor="white"
            fontSize="2xl"
            maxW="100%"
            h={{sm:'30vh' , base:'12vh'}}
            colorScheme="yellow"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
            
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
            h={{sm:'30vh' , base:'12vh'}}
            colorScheme="purple"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
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
            h={{sm:'30vh' , base:'12vh'}}
            colorScheme="blue"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
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
            h={{sm:'30vh' , base:'12vh'}}
            colorScheme="cyan"
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
            }}
          >
            {decode(shuffledAnswer[3])}
          </Button>
        </Grid>
        </Flex>
    )
}