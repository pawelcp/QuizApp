import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
import SideBar from "../src/components/SideBar/SideBar";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import SideBarMobile from "../src/components/SideBar/SideBarMobile";
import Categories from "../src/components/Categories";

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { isOpen, onOpen: onSlideIn, onClose: onSlideOut } = useDisclosure();

  const [isLargerThan1400] = useMediaQuery("(min-width: 1400px)");

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
    <Flex style={{minHeight: '100vh'}}>
      {isLargerThan1400 ? (
        ""
      ) : (
        <Box
          position='fixed'
          onClick={onSlideIn}
          cursor="pointer"
          width="7"
          height="7"
          alignItems="center"
          padding='3'
          justifyContent="center"
        >
          <IconContext.Provider value={{ size: "30px" }}>
            <GiHamburgerMenu />
          </IconContext.Provider>
        </Box>
      )}
      {!isLargerThan1400 ? (
        <SideBarMobile isOpen={isOpen} onSlideOut={onSlideOut} />
      ) : (
        <SideBar />
      )}
      <Categories />
    </Flex>
  );
}
