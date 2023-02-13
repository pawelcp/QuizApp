import { Box, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import {correctState, incorrectState} from '../../store/quizViewSlice'


export default function quizResult(){

    const Correct = useSelector(correctState)
    const IncorrectState = useSelector(incorrectState)

    return(
        <Box>
            <Text>{Correct}</Text>
            <Text>{IncorrectState}</Text>
        </Box>
    )
}