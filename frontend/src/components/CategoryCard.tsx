import {
  GridItem,
  Image,
  Text,
  Box,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import ModalElement from "./Modal";
type CategoryCardProps = {
  name: string;
  id: number;
};

export default function CategoryCard({ name, id }: CategoryCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  

  return (
    <>
      <GridItem
        w="100%"
        minHeight="52"
        maxHeight="52"
        padding="3"
        borderRadius="lg"
        borderWidth={1}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="14"
        >
          <Text fontSize="lg" as="b">
            {name}
          </Text>
          <Button
            variant="unstyled"
            backgroundColor="purple.400"
            color="#FFF"
            border="1px"
            borderColor="purple.400"
            size="lg"
            width="32"
            _hover={{color: "purple.500", backgroundColor: "transparent"}}
            onClick={onOpen}
          >
            Start Quizz
          </Button>
        </Flex>
      </GridItem>

      <ModalElement onClose={onClose} open={isOpen} name={name} id={id} />
    </>
  );
}
