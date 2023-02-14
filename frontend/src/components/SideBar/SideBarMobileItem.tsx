import { Flex, Text, Icon, Box } from "@chakra-ui/react";
import styles from "./SideBar.module.css";

interface SideBarMobileItemProps {
  itemName: string;
}

const SideBarMobileItem = ({ itemName }: SideBarMobileItemProps) => {


  const width = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg"
  }

  return (
    <Box marginX="auto">
      <Flex
        style={{transition: '.3s'}}
        paddingX="4"
        paddingY="2"
        minWidth={width}
        gap="3"
        alignItems="center"
        borderRadius="md"
        justifyContent="space-between"
        _hover={{
          backgroundColor: "#2d2a43b3",
          cursor: "pointer",
          color: "#FFF"
        }}
      >
        <Text as="b" fontSize="lg">
          {itemName}
        </Text>
        <Icon />
      </Flex>
    </Box>
  );
};
export default SideBarMobileItem;
