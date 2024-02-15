import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle({});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "16px",
      backgroundColor: "#f3f3f3",
      justifyContent: "center",
      display: "flex",
      flex: 1,
      marginTop: "8px",
      marginBottom: "8px",
      marginLeft: "32px",
      marginRight: "32px",
    },
  }),
};

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes });
