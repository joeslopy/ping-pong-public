import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  xs: "0px",
  sm: "390px",
  md: "768px",
};

export const theme = extendTheme({
  breakpoints,
  textStyles: {
    lg: {
      fontSize: {
        xs: "12px",
        sm: "14px",
        md: "16px",
      },
      fontWeight: "semibold",
    },
    "md-title": {
      fontSize: ["14px", "18px"],
      fontWeight: "semibold",
    },
    "lg-title": {
      fontSize: ["18px", "24px"],
      fontWeight: "black",
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
        xs: "10px",
        sm: "12px",
        md: "14px",
      },
      fontWeight: "semibold",
    },
  },
});
