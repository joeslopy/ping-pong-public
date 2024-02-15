import React, { useEffect, useState } from "react";
import {
  Link,
  Box,
  Flex,
  Text,
  Button,
  Stack,
  HStack,
  Show,
  Hide,
  VStack,
} from "@chakra-ui/react";
import { MenuItem } from "../NavBar";

export function SidePanel() {
  return (
    <VStack
      left={"0"}
      top={"0"}
      zIndex={"10"}
      height={"100vh"}
      width={"100%"}
      marginTop={"80px"}
      position={"absolute"}
      display={"flex"}
      overflowY={"hidden"}
      flexDirection={"column"}
      backgroundColor={"white"}
      spacing={"1rem"}
      alignItems={"left"}
      paddingLeft={"2rem"}
    >
      <MenuItem to="/leaderboard">Leaderboard</MenuItem>
      <MenuItem to="/enter-game">Enter game</MenuItem>
    </VStack>
  );
}
