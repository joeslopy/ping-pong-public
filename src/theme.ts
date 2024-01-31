import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  xs: "0px",
  sm: "445px",
  md: "545px",
};

export const theme = extendTheme({
  breakpoints,
  textStyles: {
    lg: {
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
    },
    "md-title": {
      fontSize: ["14px", "18px"],
      fontWeight: "semibold",
    },
    md: {
      fontSize: {
        xs: "10px",
        sm: "13px",
        md: "16px",
      },
      fontWeight: "medium",
    },
    sm: {
      fontSize: ["48px", "72px"],
      fontWeight: "bold",
    },
    xs: {
      fontSize: {
        xs: "8px",
        sm: "10px",
        md: "13px",
      },
      fontWeight: "semibold",
    },
  },
});
