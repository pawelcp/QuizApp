import {
  Container,
  Box,
  Input,
  Button,
  Text,
  Center,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login,  selectUser } from "../../store/userSlice";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError(true);
      toast({
        title: "Password are not the same!",
        status: "error",
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(login({ email: user.user.email, uid: user.user.uid }));
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (error) {
        toast({
            title: "Failed to create account.",
            description: "Something went wrong. Sorry !",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
    }

    // } else {
    //   createUserWithEmailAndPassword(auth, email, password)
    //     .then((userAuth) => {
    //       dispatch(
    //         login({
    //           email: userAuth.user.email,
    //           uid: userAuth.user.uid,
    //         })
    //       );
    //     })
    //     .catch((err: any) => {
    //       alert(err);
    //     });
    // }
  };
  console.log(user);

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
          Sign up
        </Text>
        <form onSubmit={handleRegister}>
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
              my="4"
            />
          </Center>
          <Center>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              borderColor={`${error && "red"}`}
              variant="flushed"
              type="password"
              fontSize="sm"
              placeholder="Password"
              w="80%"
              my="4"
              zIndex="0"
            />
          </Center>
          <Center>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setRepeatPassword(e.target.value);
              }}
              borderColor={`${error && "red"}`}
              variant="flushed"
              type="password"
              fontSize="sm"
              placeholder="Repeat password"
              w="80%"
              my="4"
              zIndex="0"
            />
          </Center>
          <Center>
            <Text
              onClick={() => {
                router.push("/auth/login");
              }}
              fontSize="sm"
              fontWeight="bold"
              mt="4"
              cursor="pointer"
            >
              I have an account
            </Text>
          </Center>
          <Center>
            <Button type="submit" py="6" px="10" my="10">
              Sign up
            </Button>
          </Center>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
