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
} from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { gradient } from "../theme";
import { MenuItemButton } from "./navigation/MenuItemButton";
import { SidePanel } from "./navigation/SidePanel";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    checkLoginStatus();
  });

  async function checkLoginStatus() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then((result) => {});

        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        return;
      }
    });
  }

  return (
    <NavBarContainer {...props}>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
      {isOpen ? <SidePanel /> : null}
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="black"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box
      display={{ base: "block", md: "none" }}
      alignSelf={"center"}
      onClick={toggle}
    >
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

export const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text whiteSpace={"nowrap"} textStyle={"nav"} display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen, isAdmin, isLoggedIn }) => {
  async function signOutFB() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <Box display={"flex"} flex={1} flexBasis={"row"}>
      <div style={{ flex: 1 }}></div>

      <HStack spacing={{ base: "16px", sm: "48px" }}>
        <div></div>
        <Show above="md">
          <MenuItem to="/leaderboard">Leaderboard</MenuItem>
          <MenuItem to="/enter-game">Enter game</MenuItem>
        </Show>

        {isLoggedIn ? (
          <MenuItemButton onClick={signOutFB}>Sign Out</MenuItemButton>
        ) : (
          <MenuItem to="/sign-in" isLast>
            <MenuItemButton>Sign in</MenuItemButton>
          </MenuItem>
        )}
        {isLoggedIn ? null : (
          <MenuItem to="/signup" isLast>
            <MenuItemButton>Sign up</MenuItemButton>
          </MenuItem>
        )}
      </HStack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      alignContent="center"
      justify="space-between"
      wrap="wrap"
      display={"flex"}
      w="100%"
      height={["80px", "100px"]}
      mb={8}
      p={8}
      margin={0}
      backgroundColor={"white"}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
