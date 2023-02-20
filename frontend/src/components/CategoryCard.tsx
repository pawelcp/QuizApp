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
        borderWidth={1}
        minHeight="44"
        padding="5"
        borderRadius="lg"
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
            backgroundColor="#2D2A43"
            color="#FFF"
            border="1px"
            borderColor="#2D2A43"
            size="lg"
            width="32"
            _hover={{color: "#2D2A43", backgroundColor: "transparent"}}
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
