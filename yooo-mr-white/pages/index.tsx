import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
import Select from "../src/components/Select";
import SideBar from "../src/components/SideBar/SideBar";
import styles from "../styles/index.module.css";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { isOpen, onOpen: onSlideIn, onClose: onSlideOut } = useDisclosure();
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
    <Box padding='5' w="100vw" position="relative">
      <Flex onClick={onSlideIn} cursor='pointer'  width='7' height='7' alignItems='center' justifyContent='center'>
        <IconContext.Provider value={{ size: "30px" }}>
          <GiHamburgerMenu />
        </IconContext.Provider>
      </Flex>
      <SideBar isOpen={isOpen} onSlideOut={onSlideOut} />
      <style>{"body { background-color: #F8F8FF }"}</style>
      <Select />
    </Box>
  );
}
