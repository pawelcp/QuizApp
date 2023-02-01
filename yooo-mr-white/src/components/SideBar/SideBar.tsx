import { Text, Flex, Avatar } from "@chakra-ui/react";
import styles from "./SideBar.module.css";
import SideBarItem from "./SideBarItem";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/userSlice";
import Link from "next/link";
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

const SideBar = () => {
  const user = useSelector(selectUser);

  return (
    <aside className={styles["side-bar"]}>
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
      {/* <Flex paddingY='3' className={styles["side-bar-item"]} w="full" gap='4' alignItems="center" justifyContent="center" marginTop="44">
        <Avatar size='md'/>
        <Text as='b' fontSize='lg'>{user?.email}</Text>
      </Flex> */}
      <Flex w="full" direction='column' gap='4' alignItems="center" justifyContent="center" marginTop="44">
        <Link href='/auth/login' className={`${styles.button} ${styles.login}`}>
          Log In
        </Link>
        <Link href='/auth/register' className={`${styles.button} ${styles.register}`}>
          Register
        </Link>
      </Flex>
    </aside>
  );
};
export default SideBar;
