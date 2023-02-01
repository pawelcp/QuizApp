import { useCounter } from "@chakra-ui/counter"
import { useCountdown } from '../src/hooks/useCountdown'
import { Box, Flex, Progress, Text, CircularProgress, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useGetQuizByParamsQuery} from '../store/apiSlice'
import { selectedCategory, selectedDifficultyLevel } from "../store/selectSlice";
import { useSelector } from "react-redux";

export default function quiz(){
    const [progress, minutes, seconds] = useCountdown(0.2);
    const selectedCategoryId = useSelector(selectedCategory);
    const selectedDifficultyLvl = useSelector(selectedDifficultyLevel);

    
    const {data: quizRes} = useGetQuizByParamsQuery({
      categoryId: selectedCategoryId.categoryId,
      difficultyLevel: selectedDifficultyLvl.difficultyLevel
    });
    console.log(quizRes?.results[0].question);
    
    
    return (
        <Box
          rounded="xl"
          bg="white"
          p={[1, 8]}
          my="4"
          w="95%"
          border='2px'
          mx='auto'
          shadow='xl'
        >
          <Flex flexDirection="row" width="100%" alignItems="center">
            <Box w='70vw'>
              <Text textAlign='center' fontSize='3xl'>{quizRes?.results[0].question.replace(/&#039;/,"'").replace(/&quot;/, "'" ).replace(/&ldquo;/,"'").replace(/&quot;/, "'").replace(/&eacute;/, 'é').replace(/&rdquo;/, "'").replace(/&quot;/,"'")}</Text>
            </Box>
            <Spacer></Spacer>
              <Text justifySelf='center' fontSize='2xl' fontWeight='bold' textAlign='center'>{`${seconds}`}</Text>
            <Box w='10vw' right='5%' top='5%' alignItems='center' justifyItems='center'>
              <CircularProgress value={progress} w='10vw' size='100px' thickness='4px' />
            </Box>
          </Flex>
        </Box>
      );

    }
