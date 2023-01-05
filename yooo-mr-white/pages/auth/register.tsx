import { 
    Container,
    Box,
    Input,
    Button,
    Text,
    Center

 } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React,{ useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "../../store/userSlice";
import {auth} from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";


const Register = () => {


    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

const registerInApp = () => { 
    if(password !== repeatPassword){
        setError(true)
        return
    }else{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            dispatch(
            login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
            })
        )
    })
    .catch((err) => {
    alert(err);
  });
};
}
console.log(user); 
    
  
    

    return(
        <Container maxW={"md"} py='24' px={{ base: '0', sm: '8' }}>
            <Box py={{sm:'8',base:'0'}} rounded='2xl' shadow={{sm:'2xl',base:'none'}}>
                <Center>
                    <Text fontSize='4xl' fontWeight='bold' mb='8' p='6'>Sign up</Text>
                </Center>
                <Box>
                    <Center>
                        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} variant='flushed' fontSize='sm' type='text' placeholder="Email" w='80%' my='4'></Input>
                    </Center>
                    <Center>
                        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} variant='flushed' type='password' fontSize='sm' placeholder="Password" w='80%' my='4' zIndex='0'></Input>
                    </Center>
                    <Center>
                        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setRepeatPassword(e.target.value)}} variant='flushed' type='password' fontSize='sm'  placeholder="Repeat password" w='80%' my='4' zIndex='0'></Input>
                    </Center>
                </Box>
                <Center>
                    <Text onClick={()=>{router.push('/auth/login')}} fontSize='sm' fontWeight='bold' mt='4' cursor='pointer'>I have an account</Text>
                </Center>
                <Center>
                    <Button onClick={registerInApp} py='6' px='10' my='10'>Sign up</Button>
                </Center>
            </Box>    
        </Container>
    )
}


export default Register