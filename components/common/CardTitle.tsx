import { Box, Typography } from "@mui/material";
import React from "react";
import { Iconify } from "./iconify";

type cardTitleProps = {
  title: string;
  icon: string
};

const boxStyle = {
  my: 4,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
}

export function CardTitle({ title, icon }: cardTitleProps) {
  return (
    <Box sx={boxStyle}>
      <Iconify
        icon={icon}
        width={40}
        sx={{
          color: "#6b7280",
        }}
      />
      <Typography variant="h4" component="h1" align="left" color="#6b7280">
        Orders
      </Typography>
      <Iconify icon="mynaui:arrow-right" width={16} color="#6b7280" />
      <Typography
        variant="h5"
        component="span"
        align="left"
        color="#6b7280"
        style={{ marginLeft: 4 }}
      >
        {title}
      </Typography>
    </Box>
  );
}
