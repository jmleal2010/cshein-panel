"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fcfbfd",
    },
    primary: {
      main: "#0369a1",
    },
    
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          background: "#fcfbfd", // Establece el fondo de todas las tablas
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
  
});

export default theme;
