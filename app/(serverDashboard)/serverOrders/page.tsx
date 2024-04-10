import OrderList from "@/components/common/OrderList";
import OrderTable from "@/components/common/OrderTable";
import { LOAD_ORDERS_QUERY } from "@/graphql/queries";
import { Box, Button, Typography } from "@mui/joy";
import { Fragment, Suspense } from "react";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import OrderTableSkeleton from "@/components/skeletons/order-table-skeleton";

const columns = [
  {
    name: "stage",
    title: "Stage ",
  },
  {
    name: "status",
    title: "Status",
  },
  {
    name: "code",
    title: "Code",
  },
  {
    name: "createdAt",
    title: "Fecha creada",
  },
  {
    name: "deliveryAt",
    title: "Fecha entrega",
  },
  {
    name: "",
    title: "Operaciones",
  },
];

export default async function ServerOrders({
  searchParams,
}: {
  searchParams?: {
    query: string;
  };
}) {

    console.log(searchParams?.query);
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
      <Suspense fallback={<OrderTableSkeleton />}>
        <OrderTable />
      </Suspense>
      <OrderList />
    </Fragment>
  );
}
