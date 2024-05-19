"use client";
import { Roboto } from "next/font/google";
import { useMemo } from "react";
import { grey, palette } from "./palette";
import { shadows } from "./shadows";
import { customShadows } from "./custom-shadows";
import { typography } from "./typography";
import CssBaseline from "@mui/material/CssBaseline";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const memoizedValue: any = useMemo(
    () => ({
      palette: { ...palette() },
      typography,
      components: components,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const components = {
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
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#fcfbfd",
          color: "rgb(33, 43, 54)",
          transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          backgroundImage: "none",
          overflow: "hidden",
          position: "relative",
          boxShadow:
            "rgba(145, 158, 171, 0.2) 0 0 2px 0, rgba(145, 158, 171, 0.12) 0 12px 24px -4px",
          borderRadius: "16px",
          zIndex: "0",
          padding: "16px",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: any }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
};

// import * as React from "react";
// import Checkbox from "@mui/material/Checkbox";
// import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import { orange } from "@mui/material/colors";

// declare module "@mui/material/styles" {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

// const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
//   color: theme.status.danger,
//   "&.Mui-checked": {
//     color: theme.status.danger,
//   },
// }));

// const theme = createTheme({
//   status: {
//     danger: orange[500],
//   },
// });
