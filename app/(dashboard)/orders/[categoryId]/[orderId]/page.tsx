import { LOAD_ORDER_QUERY } from "@/graphql/queries/order";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { getClient } from "@/config/apollo";
import {PackageTable} from "@/components/pages/order";
import { OrderHistory, OrderInfo } from "@/sections/orders";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Iconify } from "@/components/common";

const activity = [
  { id: 1, type: "creada", date: "7d ago", dateTime: "2023-01-23T10:32" },
  { id: 2, type: "editada", date: "6d ago", dateTime: "2023-01-23T11:03" },
  { id: 3, type: "enviada", date: "6d ago", dateTime: "2023-01-23T11:24" },
  { id: 4, type: "pagada", date: "1d ago", dateTime: "2023-01-24T09:20" },
];

const getOrder = async (params: any) => {
  try {
    return await getClient().query({
      query: LOAD_ORDER_QUERY,
      variables: {
        orderId: params.orderId,
      },
    });
  } catch (err) {}
};

const Header = async () => {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        direction={{
          xs: "row",
          md: "column",
        }}
      ></Grid2>
    </Box>
  );
};

const boxStyle = {
  mt: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

export default async function OrderId({
  params,
}: {
  params: { orderId: string };
}) {
  const response = await getOrder(params);
  const order = response?.data.order || {};

  return (
    <Container maxWidth="xl">
      <Grid2 container sx={{ gap: 2 }}>
        <Grid2 xs={12}>
          <Box sx={boxStyle}>
            <Iconify
              icon="mynaui:cart"
              width={48}
              color="#6b7280"
            />
            <Typography
              variant="h4"
              component="h1"
              align="left"
              color="#6b7280"
            >
              Order
              <Typography
                variant="h5"
                component="span"
                align="left"
                color="#6b7280"
                style={{ marginLeft: 4 }}
              >
                {"#"} {order.code}
              </Typography>
            </Typography>
            {/* <OrderStatus status={order.status} checked={false} /> */}
          </Box>
        </Grid2>
        <Grid2 xs={8}>
          <PackageTable items={order.packages}></PackageTable>
          <Box sx={{ mt: 2 }}>{order && <OrderHistory data={order} />}</Box>
        </Grid2>
        <Grid2 xs={3}>
          <Paper
            elevation={0}
            className="cshein-card"
            style={{
              padding: 16,
            }}
          >
            <OrderInfo
              avatar
              title="Información del beneficiario"
              data={order.beneficiary}
            ></OrderInfo>
            {order.deliveryOrder && (
              <OrderInfo title="Entrega" data={order.deliveryOrder}></OrderInfo>
            )}
            {order.deliveryOrder && (
              <OrderInfo title="Recogida" data={order.pickupOrder}></OrderInfo>
            )}
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
