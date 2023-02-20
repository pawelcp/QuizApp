import { Box, Center, Flex, Spacer, Text } from '@chakra-ui/react'
import { SP } from 'next/dist/shared/lib/utils';
import { useSelector } from 'react-redux'
import {correctState, incorrectState} from '../../store/quizViewSlice'
import {
    selectedDifficultyLevel,
    selectedCategoryName
  } from "../../store/selectSlice";


export default function quizResult(){

    const Correct = useSelector(correctState)
    const Incorrect = useSelector(incorrectState)
    const CategoryName = useSelector(selectedCategoryName)
    const DifficultyLevel = useSelector(selectedDifficultyLevel)

    console.log(CategoryName.categoryName);
    
    
    return(
        <Box>
            <Box>
                <Flex alignItems='center' justifyContent='center'>
                    <Text w='50vw' mt='10vh' textAlign='center' fontSize='3xl' fontWeight='bold'>Category: {CategoryName.categoryName}</Text>
                    <Text w='50vw' mt='10vh' textAlign='center' fontSize='3xl' fontWeight='bold'>Difficulty level: {DifficultyLevel.difficultyLevel}</Text>
                </Flex>
            </Box>
            <Box mt='17vh' h='27vh'>
                <Flex alignItems='end' h='27vh' justifyContent='center'>
                    <Box rounded='md' mr='4vw' h={`${Correct}0%`} w='5vw' bg='purple.500'></Box>
                    <Box rounded='md' ml='4vw' h={`${Incorrect}0%`} w='5vw' bg='purple.500'></Box>
                </Flex>
            </Box>
            <Box>
                <Flex alignItems='center' justifyContent='center'>
                    <Box fontSize='4xl' textAlign='center' rounded='md' mr='4vw' w='5vw' >{Correct}</Box>
                    <Box fontSize='4xl' textAlign='center' rounded='md' ml='4vw' w='5vw' >{Incorrect}</Box>
                </Flex>
            </Box>
        </Box>
    )
}