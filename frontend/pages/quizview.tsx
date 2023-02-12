import { useCounter } from "@chakra-ui/counter"
import { useCountdown } from '../src/hooks/useCountdown'
import { Box, Flex, Progress, Text, CircularProgress, Spacer, Grid, GridItem, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useGetQuizByParamsQuery} from '../store/apiSlice'
import { selectedCategory, selectedDifficultyLevel } from "../store/selectSlice";
import { useSelector } from "react-redux";
import { async } from "@firebase/util";

export default function quiz(){
    const [progress, minutes, seconds] = useCountdown(0.2);
    const selectedCategoryId = useSelector(selectedCategory);
    const selectedDifficultyLvl = useSelector(selectedDifficultyLevel);
    const [numberQuestion, setNumberQuestion] = useState(0)
    const [shuffledAnswer, setShuffledAnswer] = useState<any[]>([])
    
    const {data: quizRes} = useGetQuizByParamsQuery({
      categoryId: selectedCategoryId.categoryId,
      difficultyLevel: selectedDifficultyLvl.difficultyLevel
    });
    const resQuestion = quizRes?.results[numberQuestion].question.replace(/&#039;/g,"'").replace(/&quot;/, "'" ).replace(/&ldquo;/,"“").replace(/&eacute;/, 'é').replace(/&rdquo;/, "”").replace(/&quot;/,"'").replace(/&rsquo;/, "'").replace(/&lsquo;/,"'")
    

    const shuffleAnswers = () => { 
       const shuffleAnswer = [
        quizRes?.results[numberQuestion].correct_answer,
        quizRes?.results[numberQuestion].incorrect_answers[0],
        quizRes?.results[numberQuestion].incorrect_answers[1],
        quizRes?.results[numberQuestion].incorrect_answers[2]
      ]
      console.log('essa');
      
      setShuffledAnswer(shuffleAnswer
      .map((answer)=>({ sort: Math.random(), value: answer}))
      .sort((a, b) => a.sort - b.sort)
      .map((obj) => obj.value))
      }
      
      useEffect(()=>{
        shuffleAnswers()
        console.log(shuffledAnswer);
        
      },[quizRes])
    
      console.log(quizRes?.results[numberQuestion].correct_answer);
      console.log(numberQuestion);
      
      
    
    
    
    

    return (
      <Box>
        <Box
          rounded="xl"
          bg="white"
          p={[1, 8]}
          my="4"
          w="95%"
          border='2px'
          mx='auto'
          shadow='xl'
          mt='5%'
        >
          <Flex flexDirection="row" width="100%" alignItems="center">
            <Box w='70vw'>
              <Text textAlign='center' fontSize='3xl'>{resQuestion}</Text>
            </Box>
            <Spacer></Spacer>
              <Text justifySelf='center' fontSize='2xl' fontWeight='bold' textAlign='center'>{`${seconds}`}</Text>
            <Box w='10vw' right='5%' top='5%' alignItems='center' justifyItems='center'>
              <CircularProgress value={progress} w='10vw' size='100px' thickness='4px' />
            </Box>
          </Flex>
        </Box>
          <Grid mx='auto' mt='15%' w='90%' templateColumns='repeat(4, 1fr)' gap={2}>
            <Button textColor='white' fontSize='2xl' w='100%' h='30vh' colorScheme='yellow'>{shuffledAnswer[0]}</Button>
            <Button textColor='white' fontSize='2xl' w='100%' h='30vh' colorScheme='purple'>{shuffledAnswer[1]}</Button>
            <Button textColor='white' fontSize='2xl' w='100%' h='30vh' colorScheme='blue'>{shuffledAnswer[2]}</Button>
            <Button textColor='white' fontSize='2xl' w='100%' h='30vh' colorScheme='cyan'>{shuffledAnswer[3]}</Button>
          </Grid>
          <Button onClick={()=>{ shuffleAnswers(); setNumberQuestion(numberQuestion +1);}}>qweqwe</Button>
        </Box>
      );

    }
