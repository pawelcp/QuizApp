import { Text, Flex, Avatar, Button, useToast } from "@chakra-ui/react";
import styles from "./SideBar.module.css";
import { IoMdClose } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { IconContext } from "react-icons";
import SideBarItem from "./SideBarItem";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { selectUser } from "../../../store/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";

interface SideBarProps {
  isOpen: boolean;
  onSlideOut: () => void;
}

const names = [
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

const SideBar = ({ isOpen, onSlideOut }: SideBarProps) => {
  const user = useSelector(selectUser);
  const transitionProperties =
    isOpen === true ? { marginLeft: "0px" } : { marginLeft: "-300px" };
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
    <aside style={transitionProperties} className={styles["side-bar"]}>
      <Flex
        cursor="pointer"
        alignItems="center"
        justifyContent="center"
        w="10"
        h="10"
        onClick={onSlideOut}
      >
        <IconContext.Provider value={{ size: "30px" }}>
          <IoMdClose />
        </IconContext.Provider>
      </Flex>
      <Flex
        w="full"
        padding="6"
        marginY="5"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="b" fontSize="2xl">
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
