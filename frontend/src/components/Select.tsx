import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  Modal,
  ModalBody,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetCategoryQuery } from "../../store/apiSlice";
import { Category } from "../../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  pushCategoryId,
  pushDifficultyLevel,
  selectedCategoryId,
  pushCategoryName
} from "../../store/selectSlice";
import { useRouter } from "next/router";

const Select = () => {
  const { data: categoryRes } = useGetCategoryQuery();

  const [categoryId, setCategoryId] = useState<string>();
  const [caategoryName, setCategoryName] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const router  = useRouter()

  const dispach = useDispatch();
  const selectedCategoryID = useSelector(selectedCategoryId);

  const pushSelected = () => {
    dispach(
      pushCategoryId({
        categoryId: categoryId,
      })
    );
    dispach(
      pushDifficultyLevel({
        difficultyLevel: difficultyLevel,
      })
    );
    dispach(
      pushCategoryName({
        categoryName: caategoryName
      })
    )
  };

  return (
    <Box m="0 auto" w="90vw">
      <Center>
        <Text p="6" mt="5vh" fontWeight="bold" fontSize="4xl">
          Choose category for your quizz
        </Text>
      </Center>
      <Box w="100%">
        <Grid
          mt="3vh"
          templateColumns={{
            lg: "repeat(4, 1fr)",
            md: "repeat(3, 1fr)",
            sm: "repeat(2, 1fr)",
            xl: "repeat(6, 1fr)",
          }}
          gap="10"
        >
          {categoryRes &&
            categoryRes.trivia_categories.map((category: Category) => {
              return (
                <GridItem
                  cursor="pointer"
                  rounded="xl"
                  bg="blackAlpha.800"
                  w="100%"
                  h="10vh"
                  shadow="2xl"
                  _hover={{ backgroundColor: "black" }}
                  _focus={{ backgroundColor: "black" }}
                >
                  <Flex>
                    <Box
                      onClick={() => {
                        setCategoryId(category.id.toString());
                        onOpen();
                        setCategoryName(category.name);
                      }}
                      display="flex"
                      w="100%"
                      h="10vh"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                    >
                      <Center>
                        {category.name.length < 15 && (
                          <Text
                            textAlign="center"
                            p="1"
                            fontSize="2xl"
                            color="white"
                            fontWeight="medium"
                          >
                            {category.name}
                          </Text>
                        )}
                        {category.name.length > 15 && (
                          <Text
                            textAlign="center"
                            p="1"
                            fontSize="md"
                            color="white"
                            fontWeight="medium"
                          >
                            {category.name}
                          </Text>
                        )}
                      </Center>
                    </Box>
                  </Flex>
                </GridItem>
              );
            })}
        </Grid>
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
          <ModalOverlay />
          <ModalContent mt="30vh" pb="8">
            <ModalHeader>
              Choose a difficulty level for {caategoryName}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justifyContent="center">
                <Button
                  onClick={() => {
                    setDifficultyLevel("easy");
                  }}
                  opacity="0.7"
                  fontSize="3xl"
                  p="8%"
                  colorScheme="green"
                  m="1"
                  _active={{
                    bg: "green",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                  }}
                  _focus={{ bg: "green", opacity: "1" }}
                >
                  Easy
                </Button>
                <Button
                  onClick={() => {
                    setDifficultyLevel("medium");
                  }}
                  opacity="0.7"
                  fontSize="3xl"
                  px="5%"
                  py="8%"
                  colorScheme="orange"
                  _active={{
                    bg: "orange",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                  }}
                  _focus={{ bg: "orange", opacity: "1" }}
                  m="1"
                >
                  Medium
                </Button>
                <Button
                  onClick={() => {
                    setDifficultyLevel("hard");
                  }}
                  opacity="0.7"
                  fontSize="3xl"
                  p="8%"
                  colorScheme="red"
                  m="1"
                  _active={{
                    bg: "red",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                  }}
                  _focus={{ bg: "red", opacity: "1" }}
                >
                  Hard
                </Button>
              </Flex>
            </ModalBody>
            <Flex justifyContent="center">
              <Button
                onClick={()=>{pushSelected(); router.push('/QuizView/quizView')}}
                color="white"
                bg="blackAlpha.800"
                fontSize="2xl"
                p="5%"
                mt="2"
                w="10vw"
                _hover={{ bg: "black" }}
              >
                Start
              </Button>
            </Flex>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};
export default Select;