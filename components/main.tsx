"use client";
import { useResponsive } from "@/hooks/use-responsive";
import { HEADER, NAV, SPACING } from "@/utils/consts";
import { Box } from "@mui/material";
import React from "react";
import BreadcrumbsNav from "./navigation/Breadcrumbs";

function Main({
  children,
  sx,
  ...other
}: {
  children: React.ReactNode;
  sx?: any;
}) {
  const lgUp = useResponsive("up", "lg", 'xl');
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: "flex",
        flexDirection: "column",
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      <BreadcrumbsNav />
      {children}
    </Box>
  );
}

export default Main;
