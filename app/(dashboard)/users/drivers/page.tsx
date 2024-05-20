import * as React from "react";
import Container from "@mui/material/Container";
import {FilterForm} from "@/components/pages/order";
import { STable as Table } from "@/components/pages/users/";
import { Box, Typography } from "@mui/material";
import { Iconify } from "@/components/common";

type UserPageProps = {
  params: { categoryId: string };
  searchParams?: { query?: string; page?: string; rows?: string };
};

export default function OrdersPage({ params, searchParams }: UserPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const pageTitle = `Drivers`;

  const boxStyle = {
    my: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  };
  return (
    <Container maxWidth="xl">
      <Box sx={boxStyle}>
        <Iconify
          icon="mynaui:users"
          width={40}
          sx={{
            color: "#6b7280",
          }}
        />
        <Typography variant="h4" component="h1" align="left" color="#6b7280">
          Users
        </Typography>

        <Typography
          variant="h5"
          component="span"
          align="left"
          color="#6b7280"
          style={{ marginLeft: 4 }}
        >
          -{">"} {pageTitle}
        </Typography>
      </Box>
      <FilterForm placeholder="usuario" />
      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}
