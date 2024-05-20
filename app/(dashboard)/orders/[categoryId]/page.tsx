import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { STable as Table } from "@/components/pages/order";
import { FilterForm } from "@/components/pages/order";
import { Iconify } from "@/components/common";

type OrderPageProps = {
  params: { categoryId: string };
  searchParams?: { query?: string; page?: string; rows?: string };
};
export default function OrdersPage({ params, searchParams }: OrderPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const pageTitle = `${params.categoryId
    ?.charAt(0)
    .toUpperCase()}${params.categoryId?.slice(1)}`;

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
          icon="mynaui:clipboard"
          width={40}
          sx={{
            color: "#6b7280",
          }}
        />
        <Typography variant="h4" component="h1" align="left" color="#6b7280">
          Orders
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
      <FilterForm placeholder="orden" />

      <Table
        query={query}
        currentPage={currentPage}
        status={params.categoryId}
      />
    </Container>
  );
}
