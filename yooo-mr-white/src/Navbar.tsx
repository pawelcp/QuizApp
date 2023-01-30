import { 
  
    Text,
    Box,
    Flex,
    Button,
    Spacer,
    Center,
    Avatar
  
  
  } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectUser } from "../store/userSlice"

const Navbar = () => { 

    const router = useRouter()
    const user = useSelector(selectUser);
    console.log(user);
    

    return(
        <Box shadow='lg' h='7vh' width='100%' left='0' bg='white'>
            <Flex h='100%'>
                <Center>
                <Text textAlign='end' fontWeight='bold' fontSize='3xl' w='25vw'>QUIZZYY</Text>
                </Center>
                <Spacer></Spacer>
                <Center>
                {!user?
                <Box w='30vw'>
                    <Button m='2' onClick={()=>{router.push('/auth/register')}}>Sign Up</Button>
                    <Button m='2' onClick={()=>{router.push('/auth/login')}}>Log In</Button>
                </Box>:
                <Center>
                <Box w='30vw'>
                    <Flex>
                    <Avatar shadow='lg' m='2'></Avatar>
                    <Center>
                    <Text >{user.email}</Text>
                    </Center>
                    </Flex>
                </Box>
                </Center>
                }
                </Center>
            </Flex>
        </Box>
    )
 }

 export default Navbar