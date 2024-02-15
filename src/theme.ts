import { extendTheme } from "@chakra-ui/react";
import "./fonts.css";
import { cardTheme } from "./theme/Card";

const breakpoints = {
  xs: "0px",
  sm: "390px",
  md: "768px",
};

const fontFamily = "source-sans";

export const gradient = "linear-gradient(to right, #eb1b2e, purple)";
export const bgColor = "#fbfbfb";

export const theme = extendTheme({
  breakpoints,
  components: {
    Card: cardTheme,
    Button: {
      sizes: {
        sm: {
          fontSize: {
            xs: "8px",
            sm: "9px",
            md: "11px",
          },
        },
      },
    },
  },

  textStyles: {
    "md-title": {
      fontSize: ["14px", "18px"],
      fontWeight: "semibold",
      fontFamily: fontFamily,
    },
    "lg-title": {
      fontSize: ["18px", "24px"],
      fontWeight: "black",
      fontFamily: fontFamily,
    },
    nav: {
      fontSize: "1rem",
      fontWeight: 400,
      fontFamily: fontFamily,
    },

    xl: {
      fontSize: {
        xs: "16px",
        sm: "18px",
        md: "20px",
      },
      color: "#4a4a4a",
      fontWeight: 700,
      fontFamily: fontFamily,
    },
    lg: {
      fontSize: {
        xs: "14px",
        sm: "16px",
        md: "18px",
      },
      color: "#4a4a4a",
      fontWeight: 600,
      fontFamily: fontFamily,
    },
    md: {
      fontSize: {
        xs: "10px",
        sm: "13px",
        md: "16px",
      },
      fontWeight: "medium",
      fontFamily: fontFamily,
    },
    sm: {
      fontSize: {
        xs: "10px",
        sm: "12px",
        md: "14px",
      },
      fontWeight: "bold",
      fontFamily: fontFamily,
    },
    xs: {
      fontSize: {
        xs: "8px",
        sm: "9px",
        md: "11px",
      },
      fontWeight: "semibold",
      fontFamily: fontFamily,
    },
  },
});
