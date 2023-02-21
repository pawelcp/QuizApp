import {
  Box,
  Center,
  Flex,
  InputGroup,
  Input,
  InputRightElement,
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
  useBreakpointValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useGetCategoryQuery } from "../../store/apiSlice";
import { Category } from "../../store/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  pushCategoryId,
  pushDifficultyLevel,
} from "../../store/selectSlice";
import { useRouter } from "next/router";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const { data: categories } = useGetCategoryQuery();

  const [categoryId, setCategoryId] = useState<string>();
  const [caategoryName, setCategoryName] = useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const dispach = useDispatch();


  const templateColumns = useBreakpointValue({
    xs: "repeat(1, 1fr)",
    sm: "repeat(1, 1fr)",
    md: "repeat(2, 2fr)",
    lg: "repeat(3, 1fr)",
  });

  

  return (
    <Box width="full" padding="5">
      <Grid
        placeItems="center"
        templateColumns={templateColumns}
        width="full"
        gap={6}
      >
        {categories?.trivia_categories.map((category) => (
          <CategoryCard key={category.id} name={category.name} id={category.id}/>
        ))}
      </Grid>
    </Box>

  );
};
export default Categories;
