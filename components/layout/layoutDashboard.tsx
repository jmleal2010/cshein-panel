"use client";
import React from "react";
import { Box } from "@mui/material";
import Nav from "@/components/navigation/nav";
import Main from "@/components/main";
import Header from "@/components/navigation/header";

type LayoutDashboardProps = {
  children: React.ReactNode;
};

function LayoutDashboard({ children }: LayoutDashboardProps) {
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

export default LayoutDashboard;
