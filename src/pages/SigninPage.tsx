import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  ChakraProvider,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase";
import { REDIRECT_URL, USER_DB } from "../environment";

import { gradient, gradientHover } from "../theme";
import NavBar from "../components/NavBar";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  async function submitTapped() {
    const firebaseApp = app;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        window.location.href = `${REDIRECT_URL}/leaderboard`;
      })
      .catch((error) => {
        setErrorMessage("Invalid Email/Password");
      });
  }

  return (
    <>
      <NavBar />
      <Flex
        minH={"100%"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Text textStyle={"lg-title"} textAlign={"center"}>
              Sign in
            </Text>
            <Text
              paddingLeft={[8, 8, 0, 0]}
              paddingRight={[8, 8, 0, 0]}
              textStyle={"lg"}
              textAlign={"center"}
              color={"gray.600"}
            >
              to enter your ping-pong games and view your history
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              {errorMessage == "" ? null : (
                <Text textStyle={"md"} color={"red"}>
                  {errorMessage}
                </Text>
              )}
              {message == "" ? null : <Text textStyle={"md"}>{message}</Text>}

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                textAlign={"center"}
                color={"#0066CC"}
                bgColor={"transparent"}
                _hover={{
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  const auth = getAuth();
                  sendPasswordResetEmail(auth, email)
                    .then(() => {
                      setMessage(`Password reset link sent to ${email}`);
                      setErrorMessage("");
                    })
                    .catch((error) => {
                      setErrorMessage("Please enter valid email address");
                    });
                }}
              >
                Forgot Password?
              </Button>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  backgroundImage={gradient}
                  color={"white"}
                  _hover={{
                    backgroundImage: gradientHover,
                  }}
                  onClick={submitTapped}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
