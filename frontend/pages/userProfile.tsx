import { Avatar, Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { selectUser } from "../store/userSlice";
import { useSelector } from "react-redux";

export default function userProfile() {

    const user = useSelector(selectUser);

    return(
        <Box>
            <Flex w='100vw' h='20vh' alignItems='center'>
                <Text w='40vw' as="b" fontSize="3xl" textAlign='center'>Quizziz</Text>
                <Spacer></Spacer>
                <Avatar mr='2' size="lg" />
                <Text w='30vw' as="b" fontSize="2xl" textAlign='start'>{user?.email}</Text>
            </Flex>
        </Box>
    )
}