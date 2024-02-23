import { extendTheme } from "@chakra-ui/react";
import "./fonts.css";
import { cardTheme } from "./theme/Card";

const fontFamily = "source-sans";
export const screenWidth = {
  md: "768px",
  sm: "480px",
  xs: "0px",
};

const breakpoints = {
  xs: screenWidth.xs,
  sm: screenWidth.sm,
  md: screenWidth.md,
};

export const gradient = "linear-gradient(to right, #eb1b2e, #a020F0)";
export const gradientHover = "linear-gradient(to right, #eb3b2e, #a040f0)";
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
      fontSize: {
        xs: "14px",
        sm: "16px",
        md: "18px",
      },
      fontWeight: "semibold",
      fontFamily: fontFamily,
    },
    "lg-title": {
      fontSize: {
        xs: "xl",
        sm: "2xl",
        md: "4xl",
      },
      fontWeight: "bold",
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
