import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import OrderTableSkeleton from "@/components/skeletons/order-table-skeleton";
import OrderTable from "@/components/server/OrderTable";
import { Suspense } from "react";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableInput from "@/components/client/table/TableInput";

export default function OrdersPage({
  params,
  searchParams,
}: {
  params: {
    categoryId: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
    rows?: string;
  };
  }) {
  //console.log(params, searchParams);  
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const pageTitle = `${params.categoryId
    ?.charAt(0)
    .toUpperCase()}${params.categoryId?.slice(1)}`;
   const rows = searchParams?.rows || "10";  
  const boxStyle = {
    my: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <Container maxWidth="xl">
      <Box sx={boxStyle}>
        <Typography variant="h4" component="h1" align="left" color="#6b7280">
          <FontAwesomeIcon icon={faClipboardList} /> Orders
          <Typography
            variant="h5"
            component="span"
            align="left"
            color="#6b7280"
            style={{ marginLeft: 4 }}
          >
            -{">"} {pageTitle}
          </Typography>
        </Typography>
      </Box>
      <TableInput/>
      <Suspense fallback={<OrderTableSkeleton />} key={query + currentPage + rows}>
        <OrderTable
          query={query}
          currentPage={currentPage}
          status={params.categoryId}
          pageSize = {rows}
        />
      </Suspense>
      {/* <OrderList /> */}
    </Container>
  );
}
