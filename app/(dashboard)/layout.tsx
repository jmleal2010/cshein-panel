"use client";
import * as React from "react";
import TimeProvider from "@/components/common/layout/LocalizationProvider";
import Box from "@mui/material/Box";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeProvider from "@/theme/theme";
import Header from "@/components/navigation/header";
import { useResponsive } from "@/hooks/use-responsive";
import Main from "@/components/main";
import Nav from "@/components/navigation/nav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openNav, setOpenNav] = React.useState(false);

  return (
    <TimeProvider>
      <ThemeProvider>
        <Header onOpenNav={() => setOpenNav(true)} />

        <Box
          sx={{
            minHeight: 1,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

          <Main>{children}</Main>
        </Box>
      </ThemeProvider>
    </TimeProvider>
  );
}
