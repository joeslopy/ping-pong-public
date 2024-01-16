import React, { useState } from "react";
import {
  Box,
  Button,
  ChakraProvider,
  Input,
  InputGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { app } from "../firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getAuth } from "firebase/auth";
import NavBar from "../components/NavBar";

export default function CreateAdmin(props: any) {
  const [email, setEmail] = useState("");

  const functions = getFunctions(app);

  const auth = getAuth();

  async function setUserAsAdmin() {
    const addAdminRole = httpsCallable(functions, "addAdminRole");
    addAdminRole({ email }).then((result: any) => {});

    checkLoggedInStatus();
  }

  function checkLoggedInStatus() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((result) => {
          return result;
        });
      } else {
        return;
      }
    });
    return;
  }

  return (
    <ChakraProvider>
      <VStack
        alignContent={"center"}
        align={"stretch"}
        width={"50%"}
        margin={"auto"}
      >
        <NavBar />
        <InputGroup>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="User Email"
          />
          <Button onClick={setUserAsAdmin}>Make Admin</Button>
        </InputGroup>
      </VStack>
    </ChakraProvider>
  );
}
