import { Link, Box, Flex, Text, Button, Stack, HStack } from "@chakra-ui/react";
import { MouseEventHandler, PropsWithChildren } from "react";
import { gradient } from "../../theme";

interface MenuItemButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function MenuItemButton({
  children,
  onClick,
}: PropsWithChildren<MenuItemButtonProps>) {
  return (
    <Button
      onClick={onClick}
      size="md"
      rounded="md"
      color={"white"}
      backgroundImage={gradient}
      _active={{}}
      _hover={{
        textDecoration: "underline",
      }}
    >
      {children}
    </Button>
  );
}
