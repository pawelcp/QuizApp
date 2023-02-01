import { useState } from "react";
import { Text, Flex, Avatar } from "@chakra-ui/react";
import styles from "./SideBar.module.css";
import { IoMdClose } from "react-icons/io";
import { IconContext } from "react-icons";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";
import Link from "next/link";

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
          marginTop="44"
        >
          <Link
            href="/auth/login"
            className={`${styles.button} ${styles.login}`}
          >
            Log In
          </Link>
          <Link
            href="/auth/register"
            className={`${styles.button} ${styles.register}`}
          >
            Register
          </Link>
        </Flex>
      ) : (
        <Flex
          paddingY="3"
          className={styles["side-bar-item"]}
          w="full"
          gap="4"
          alignItems="center"
          justifyContent="center"
          marginTop="44"
        >
          <Avatar size="md" />
          <Text as="b" fontSize="lg">
            {user?.email}
          </Text>
        </Flex>
      )}
    </aside>
  );
};
export default SideBar;
