import { 
    Container,
    Box,
    Input,
    Button,
    Text,
    Center,
    useToast,

 } from "@chakra-ui/react"
 import { useState } from "react"
 import { useRouter } from "next/router";
 import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
 import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { login, logout, selectUser } from "../../store/userSlice";
 import {auth} from '../../firebase'
 import { signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {

    const router = useRouter()
    const toast = useToast()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [open, setOpen] = useState<boolean>(true)

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    console.log(user);
    


    const loginToApp = (e: any) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
          .then((userAuth) => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
              })
            );
          })
          .catch((err) => {
            alert(err);
          });
      };

    const toggle = () => {
        setOpen(!open)
    }
    if(user!==null){router.push('/')}

    return(
        <Container maxW={"md"} py='24' px={{ base: '0', sm: '8' }}>
            <Box py={{sm:'8',base:'0'}} rounded='2xl' shadow={{sm:'2xl',base:'none'}}>
                <Center>
                    <Text fontSize='4xl' fontWeight='bold' mb='8' p='6'>Log in</Text>
                </Center>
                <Box>
                    <Center>
                    <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} variant='flushed' fontSize='sm' type='text' placeholder="Email" w='80%' my='8'></Input>
                    </Center>
                    <Box position='relative'>   
                        <Center>
                            <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} variant='flushed' fontSize='sm' type={!open?'text':'password'} placeholder="Password" w='80%' my='8' zIndex='0'></Input>
                            <Box position='absolute' cursor='pointer' right='16' zIndex='1'>
                                {(open !== false) ? <AiFillEye onClick={toggle} /> : <AiFillEyeInvisible onClick={toggle} />}
                            </Box>
                        </Center>
                    </Box>
                </Box>
                <Center>
                    <Text onClick={()=>{router.push('/auth/register')}} fontSize='sm' fontWeight='bold' mt='4' cursor='pointer'>Don't have an account?</Text>
                </Center>
                <Center>
                    <Button onClick={loginToApp} py='6' px='10' my='10'>Log in
                    </Button>
                </Center>
            </Box>    
        </Container>
    )
}


export default Login