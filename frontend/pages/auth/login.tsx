import {
  Container,
  Box,
  Input,
  Button,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../store/userSlice";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(login({ email: user.user.email, uid: user.user.uid }));
      toast({
        title: "Logged In.",
        description: "Succesfully logged you in!.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
      toast({
        title: "Failed to logged!.",
        description: "Something went wrong. Sorry !",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  if (user !== null) {
    router.push("/");
  }

  return (
    <Container maxW="md" py="24" px={{ base: "0", sm: "8" }}>
      <Box
        py={{ sm: "8", base: "0" }}
        rounded="2xl"
        shadow={{ sm: "2xl", base: "none" }}
      >
        <Text textAlign="center" fontSize="4xl" fontWeight="bold" mb="8" p="6">
          Log in
        </Text>
        <form onSubmit={handleLogin}>
          <Center>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              variant="flushed"
              fontSize="sm"
              type="text"
              placeholder="Email"
              w="80%"
              my="8"
            />
          </Center>
          <Box position="relative">
            <Center>
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
                variant="flushed"
                fontSize="sm"
                type={!isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                w="80%"
                my="8"
                zIndex="0"
              />
              <Box position="absolute" cursor="pointer" right="16" zIndex="1">
                {isPasswordVisible === true ? (
                  <AiFillEye onClick={handlePasswordVisibility} />
                ) : (
                  <AiFillEyeInvisible onClick={handlePasswordVisibility} />
                )}
              </Box>
            </Center>
          </Box>
          <Center>
            <Text
              onClick={() => {
                router.push("/auth/register");
              }}
              fontSize="sm"
              fontWeight="bold"
              mt="4"
              cursor="pointer"
            >
              Don't have an account?
            </Text>
          </Center>
          <Center>
            <Button type="submit" py="6" px="10" my="10">
              Log in
            </Button>
          </Center>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
