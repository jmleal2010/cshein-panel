"use client";
import { Roboto } from "next/font/google";
import { useMemo } from "react";
import { palette } from "./palette";
import { shadows } from "./shadows";
import { customShadows } from "./custom-shadows";
import { typography } from "./typography";
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

let theme: any
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const memoizedValue: any = useMemo(
    () => ({
      palette: palette(),
      typography,
      components: components,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

theme = createTheme(memoizedValue);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}

export { theme };

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
          backgroundColor: '#fcfbfd',
          color: 'rgb(33, 43, 54)',
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          backgroundImage: 'none',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0 0 2px 0, rgba(145, 158, 171, 0.12) 0 12px 24px -4px',
          borderRadius: '16px',
          zIndex: '0',
          padding: '16px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }: any) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
  },
};


