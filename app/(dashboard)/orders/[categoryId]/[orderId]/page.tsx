
import { LOAD_ORDER_QUERY } from "@/graphql/queries";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Container, Grid, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { getClient } from "@/config/apollo";
import SpanningTable from "@/components/pages/order/table/PackageTable";
import CustomerInfo from "@/components/pages/order/CustomerInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import OrderHistory from "@/components/pages/order/OrderHistory";

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
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        direction={{
          xs: "row",
          md: "column",
        }}
      ></Grid>
    </Box>
  );
};

const boxStyle = {
  my: 4,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
};

export default async function OrderId({
  params,
}: {
  params: { orderId: string };
}) {
  const response = await getOrder(params);
  const order = response?.data.order || {};

  return (
    <Container sx={{ mt: 5 }} maxWidth="xl">
      <Grid container sx={{ gap: 2 }}>
        <Grid xs={12}>
          <Box sx={boxStyle}>
            <Typography
              variant="h4"
              component="h1"
              align="left"
              color="#6b7280"
            >
              <FontAwesomeIcon icon={faCartShopping} /> Order
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
            <Button
              variant="outlined"
              size="small"
              color={order.status === "ACCEPTED" ? "primary" : "error"}
            >
              {" "}
              {order.status}
            </Button>
          </Box>
        </Grid>
        <Grid xs={8}>
          <SpanningTable items={order.packages}></SpanningTable>
        </Grid>
        <Grid xs={3}>
          <Paper elevation={0} className="cshein-card">
            <CustomerInfo
              avatar
              title="Información del beneficiario"
              data={order.beneficiary}
            ></CustomerInfo>
            {order.deliveryOrder && (
              <CustomerInfo
                title="Entrega"
                data={order.deliveryOrder}
              ></CustomerInfo>
            )}
            {order.deliveryOrder && (
              <CustomerInfo
                title="Recogida"
                data={order.pickupOrder}
              ></CustomerInfo>
            )}
          </Paper>
        </Grid>
        <Grid xs={8}>
          {order && <OrderHistory data={order} />}
        </Grid>
      </Grid>
    </Container>
  );
}
