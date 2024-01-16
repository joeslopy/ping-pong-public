import React, { useEffect, useState } from "react";
import { Link, Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";

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
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
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
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/leaderboard">Leaderboard</MenuItem>
        <MenuItem to="/enter-game">Enter game</MenuItem>

        {isAdmin === true ? (
          <MenuItem to="/create-manager">Create admin </MenuItem>
        ) : null}

        {isLoggedIn ? (
          <Button
            onClick={signOutFB}
            size="sm"
            rounded="md"
            color={["blue", "blue", "white", "white"]}
            bg={["white", "white", "blue", "blue"]}
            _hover={{
              bg: ["blue", "blue", "blue", "blue"],
            }}
          >
            Sign Out
          </Button>
        ) : (
          <MenuItem to="/sign-in" isLast>
            <Button
              size="sm"
              rounded="md"
              color={["blue", "blue", "white", "white"]}
              bg={["white", "white", "blue", "blue"]}
              _hover={{
                bg: ["blue", "blue", "blue", "blue"],
              }}
            >
              Sign in
            </Button>
          </MenuItem>
        )}
        {isLoggedIn ? null : (
          <MenuItem to="/signup" isLast>
            <Button
              size="sm"
              rounded="md"
              color={["blue", "blue", "white", "white"]}
              bg={["white", "white", "blue", "blue"]}
              _hover={{
                bg: ["blue", "blue", "blue", "blue"],
              }}
            >
              Sign up
            </Button>
          </MenuItem>
        )}
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["blue", "blue", "transparent", "transparent"]}
      color={["white", "white", "blue", "blue"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
