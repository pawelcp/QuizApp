import { Box, Flex, Text } from "@chakra-ui/react";

export default function userProfile() {

    return(
        <Box>
            <Flex w='40vw' h='20vh' alignItems='center' justifyContent='center'>
                <Text as="b" fontSize="3xl">Quizziz</Text>
            </Flex>
        </Box>
    )
}