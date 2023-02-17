import { GridItem, Image, Text, Box, Button, Flex } from "@chakra-ui/react";

type CategoryCardProps = {
  name: string;
};

export default function CategoryCard({ name }: CategoryCardProps) {
  return (
    <GridItem
      w="80%"
      borderWidth={1}
      padding={2}
      borderRadius="lg"
    >
      <Box>
        <Text fontSize="xl" as="b">{name}</Text>
      </Box>
    </GridItem>
  );
}
