import { useCounter } from "@chakra-ui/counter"
import { useCountdown } from '../src/hooks/useCountdown'
import { Box, Flex, Progress, Text, CircularProgress } from "@chakra-ui/react";
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
          rounded="md"
          bg="white"
          p={[1, 8]}
          my="4"
          w="100%"
        >
          <Flex flexDirection="row" width="100%" alignItems="center">
            <CircularProgress value={progress} size='100px' thickness='4px' />
            <Text>{`${minutes}:${seconds}`}</Text>
          </Flex>
          <Text>{quizRes?.results[0].question}</Text>
        </Box>
      );

    }
