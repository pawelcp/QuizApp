import { useCounter } from "@chakra-ui/counter"
import { useCountdown } from '../src/useCountdown'
import { Box, Flex, Progress, Text, CircularProgress } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function quiz(){
    const [progress, minutes, seconds] = useCountdown(0.1);
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
        </Box>
      );

    }
