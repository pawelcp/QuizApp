import { Flex, Text, Icon } from "@chakra-ui/react";
import styles from './SideBar.module.css';
interface SideBarItemProps {
  itemName: string;
}

const SideBarItem = ({ itemName }: SideBarItemProps) => {
  return (
    <Flex padding='3' className={styles["side-bar-item"]} w='52' gap='3' alignItems="center" justifyContent="space-between" >
      <Text as="b" fontSize="xl">
        {itemName}
      </Text>
      <Icon />
    </Flex>
  );
};
export default SideBarItem;
