import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OrderTable from "@/components/common/OrderTable";
import OrderList from "@/components/common/OrderList";
import * as React from "react";
import { Fragment, Suspense } from "react";
import OrderTableSkeleton from "@/components/skeletons/order-table-skeleton";

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
    <Fragment>
      <Box
        sx={{
          display: "flex",
          mb: 1,
          gap: 1,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "start", sm: "center" },
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Typography level="h2" component="h1">
          Orders
        </Typography>
        <Button
          color="primary"
          startDecorator={<DownloadRoundedIcon />}
          size="sm"
        >
          Download PDF
        </Button>
      </Box>
      <Suspense fallback={<OrderTableSkeleton />} key={query + currentPage}>
        <OrderTable query={query} currentPage={currentPage} />
      </Suspense>
      <OrderList />
    </Fragment>
  );
}
