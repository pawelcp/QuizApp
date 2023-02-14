import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import styles from "./SideBar.module.css";

interface SideBarItemProps {
  itemName: string;
}

const SideBarItem = ({ itemName }: SideBarItemProps) => {
  return (
    <Box marginX="auto">
      <Flex
        paddingX="4"
        paddingY="2"
        className={styles["side-bar-item"]}
        gap="3"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text as="b" fontSize="xl">
          {itemName}
        </Text>
        <Icon />
      </Flex>
    </Box>
  );
};
export default SideBarItem;
