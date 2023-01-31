import { Box, Button, Container, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
import { db } from "../firebase";
import Navbar from "../src/components/Navbar";
import Select from "../src/components/Select";

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <Box w="100vw">
      <style>{"body { background-color: #F8F8FF }"}</style>
      <Navbar />
      <Select />
      {/* <Button onClick={()=>{dispatch(logout())}}> log out </Button> */}
    </Box>
  );
}
