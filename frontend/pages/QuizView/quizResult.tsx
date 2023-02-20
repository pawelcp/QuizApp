import { Avatar, Box, Button, Center, Flex, Spacer, Text, } from '@chakra-ui/react'

import { SP } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import { AiOutlineHome } from 'react-icons/ai';
import { IoMdArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux'
import {correctState, incorrectState, reset} from '../../store/quizViewSlice'
import {
    selectedDifficultyLevel,
    selectedCategoryName
  } from "../../store/selectSlice";
import { useDispatch } from 'react-redux';


export default function quizResult(){

    const Correct = useSelector(correctState)
    const Incorrect = useSelector(incorrectState)
    const CategoryName = useSelector(selectedCategoryName)
    const DifficultyLevel = useSelector(selectedDifficultyLevel)

    const router = useRouter()
    const dispach = useDispatch()
    
    const resetState = () => { 
        dispach(reset())
     }
    
    return(
        <Box>
            <Box>
            <Box mt='2vh'>
                <Flex alignItems='center' justifyContent='center'>
                    <Button onClick={()=>{router.push('/'); resetState()}} fontSize='xl' bg='white' shadow='2xl' border='2px' mr='30vw' w='15vw' h='9vh' >Home page <AiOutlineHome style={{ marginLeft: '6px' }}/></Button>
                    <Button onClick={()=>{router.push('/userProfile'); resetState()}} fontSize='xl' bg='white' shadow='2xl' border='2px' ml='30vw' w='15vw' h='9vh'>Your profile <Avatar size='sm' ml='4'></Avatar></Button>
                </Flex>
            </Box>
                <Flex alignItems='center' justifyContent='center'>
                    <Box>
                        <Text w='50vw' mt='3vh' textAlign='center' fontSize='3xl' fontWeight='bold'>Category:</Text>
                        <Text w='50vw' textAlign='center' fontSize='4xl' fontWeight='bold'>{CategoryName.categoryName}</Text>
                    </Box>
                    <Box>
                        <Text w='50vw' mt='3vh' textAlign='center' fontSize='3xl' fontWeight='bold'>Difficulty Level:</Text>
                        <Text w='50vw' textAlign='center' textColor={DifficultyLevel.difficultyLevel==='easy'?'green':DifficultyLevel.difficultyLevel==='medium'?'yellow.400':'red'} fontSize='4xl' textTransform='uppercase' fontWeight='bold'>{DifficultyLevel.difficultyLevel}</Text>
                    </Box>
                </Flex>
            </Box>
            <Box mt='15vh' h='27vh'>
                <Flex alignItems='end' h='27vh' justifyContent='center'>
                    <Box rounded='md' mr='9.5vw' h={`${Correct}0%`} w='5vw' bg='green'></Box>
                    <Box rounded='md' ml='9.5vw' h={`${Incorrect}0%`} w='5vw' bg='red'></Box>
                </Flex>
            </Box>
            <Box>
                <Flex alignItems='center' justifyContent='center'>
                    <Box fontSize='xl' textColor='green' fontWeight='bold' textAlign='center' rounded='md' mr='9vw' w='6vw' >Correct</Box>
                    <Box fontSize='xl' textColor='red' fontWeight='bold' textAlign='center' rounded='md' ml='9vw' w='6vw' >Incorrect</Box>
                </Flex>
            </Box>
            <Box>
                <Flex alignItems='center' justifyContent='center'>
                    <Box fontSize='4xl' textColor='green' fontWeight='bold' textAlign='center' rounded='md' mr='9vw' w='6vw' >{Correct}</Box>
                    <Box fontSize='4xl' textColor='red' fontWeight='bold' textAlign='center' rounded='md' ml='9vw' w='6vw' >{Incorrect}</Box>
                </Flex>
            </Box>
            <Box mt='5vh'>
                <Flex alignItems='center' justifyContent='center'>
                    <Button onClick={()=>{router.push('/QuizView/quizView');resetState()}} textColor='white' fontSize='xl' bg='purple.500' shadow='2xl' w='15vw' h='9vh'>Play again</Button>
                </Flex>
            </Box>
        </Box>
    )
}