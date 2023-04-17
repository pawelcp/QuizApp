import { Text, Flex, Avatar, Button, useToast } from "@chakra-ui/react";
import styles from "./SideBar.module.css";
import { BiLogOut } from "react-icons/bi";
import { IconContext } from "react-icons";
import SideBarItem from "./SideBarItem";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { selectUser } from "../../../store/userSlice";
import { useRouter } from "next/router";

export const names = [
  {
    itemName: "Leaderboard",
    iconName: "",
  },
  {
    itemName: "Community",
    iconName: "",
  },
  {
    itemName: "Shop",
    iconName: "",
  },
  {
    itemName: "Notification",
    iconName: "",
  },
];

const SideBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      toast({
        title: "Failed to sign out!.",
        description: "Something went wrong. Sorry !",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <aside className={`${styles["side-bar"]} ${styles["side-bar-desktop"]}`}>
      <Flex
        w="full"
        padding="6"
        marginY="5"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="b" fontSize="3xl" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>
          Quizziz
        </Text>
      </Flex>
      <Flex
        w="full"
        marginY="20"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="5"
      >
        {names.map((name) => {
          return <SideBarItem key={name.itemName} itemName={name.itemName} />;
        })}
      </Flex>
      {!user ? (
        <Flex
          w="full"
          direction="column"
          gap="4"
          alignItems="center"
          justifyContent="center"
          marginTop="32"
        >
          <Button
            onClick={() => router.push("/auth/login")}
            size="lg"
            background="#2D2A43"
            _hover={{ background: "transparent" }}
            className={`${styles.button} ${styles.login}`}
          >
            Log In
          </Button>
          <Button
            onClick={() => router.push("/auth/register")}
            size="lg"
            background="transparent"
            _hover={{ background: "#2D2A43" }}
            className={`${styles.button} ${styles.register}`}
          >
            Register
          </Button>
        </Flex>
      ) : (
        <Flex
          onClick={()=>{router.push('/userProfile')}}
          paddingY="2"
          className={styles["side-bar-item"]}
          w="full"
          gap="4"
          alignItems="center"
          justifyContent="center"
          marginTop="32"
        >
          <Avatar size="sm" />
          <Text as="b" fontSize="lg">
            {user?.email}
          </Text>
        </Flex>
      )}
      {!user ? (
        ""
      ) : (
        <Flex
          marginTop="10"
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            onClick={logoutHandler}
            size="lg"
            background="transparent"
            _hover={{ background: "#2D2A43" }}
            className={`${styles.button} ${styles.logout}`}
          >
            <Flex
              w="full"
              h="full"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text as="b" fontSize="xl" color="inherit">
                Logout
              </Text>
              <IconContext.Provider value={{ size: "30px", color: "inherit" }}>
                <BiLogOut />
              </IconContext.Provider>
            </Flex>
          </Button>
        </Flex>
      )}
    </aside>
  );
};
export default SideBar;