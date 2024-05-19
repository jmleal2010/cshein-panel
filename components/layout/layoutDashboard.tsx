"use client";
import React from "react";
import { Box } from "@mui/material";
import {Nav, Header} from "@/components/navigation";
import {Main} from "@/components/common";

type LayoutDashboardProps = {
  children: React.ReactNode;
};

export function LayoutDashboard({ children }: LayoutDashboardProps) {
  const [openNav, setOpenNav] = React.useState(false);
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

