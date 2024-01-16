import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

export default function WelcomePage() {
  return (
    <ChakraProvider>
      <NavBar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack align={"center"}>
          <Heading fontSize={"1xl"} textAlign={"center"}>
            Welcome to Pingy Pong
          </Heading>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
}
