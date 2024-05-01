import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { Button, TextField } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OrderTableSkeleton from "@/components/skeletons/order-table-skeleton";
import OrderTable from "@/components/common/OrderTable";
import { Suspense } from "react";
import OrderList from "@/components/common/OrderList";

export default function OrdersPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h1" align="left">
          Orders
        </Typography>
        <Button variant="contained" color="primary" size="small">
          Download PDF
        </Button>
      </Box>
      
      <Suspense fallback={<OrderTableSkeleton />} key={query + currentPage}>
        <OrderTable query={query} currentPage={currentPage} />
      </Suspense>
      {/* <OrderList /> */}
    </Container>
  );
}
