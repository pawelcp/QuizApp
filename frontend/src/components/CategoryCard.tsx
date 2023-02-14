import { GridItem, Image, Text, Box, Button, Flex } from "@chakra-ui/react";

export default function CategoryCard() {
  return (
    <GridItem w="100%" borderRadius="xl" minHeight="xs" boxShadow="md">
      <Box position="relative" height="full" width="full">
        <Image
          zIndex="-1"
          width="100%"
          borderRadius="xl"
          src="https://images.pexels.com/photos/8474448/pexels-photo-8474448.jpeg"
        />
        <Box
          style={{ bottom: "0", left: "0" }}
          position="absolute"
          width="full"
          backgroundColor="#FFF"
          height="32"
          borderRadius="xl"
          zIndex="1"
          padding="3"
        >
          <Box paddingX="5" paddingY="2">
            <Text as="b" fontSize="xl">
              Name of the Category
            </Text>
          </Box>
          <Flex width="full" justifyContent="flex-end">
            <Button  colorScheme="linkedin" variant="solid">Launch Quizz!</Button>
          </Flex>
        </Box>
      </Box>
    </GridItem>
  );
}
