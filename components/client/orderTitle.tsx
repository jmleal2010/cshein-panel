"use client";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Container, Grid, IconButton, Paper, Typography } from "@mui/material";
import { ArrowBack, ArrowBackIos } from "@mui/icons-material";
import Link from "next/link";

const persona = {};

const OrderTitle = ({ orderId }: { orderId: string }) => {
  console.log(orderId);
  return (
    <>
      <Paper elevation={0} sx = {{mb: 2}}>
        <Box display = "flex" alignItems="center">
        <Link href="#">
      <IconButton aria-label="go back">
        <ArrowBackIos />
      </IconButton>
    </Link>
         <Typography  variant="h5">
            Order#{orderId}
          </Typography>
        </Box>
      </Paper>
    </>
  );
};

export default OrderTitle;
