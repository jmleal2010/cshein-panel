import { LOAD_ORDER_QUERY } from "@/graphql/queries";
import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import { getClient } from "@/config/apollo";
import OrderTitle from "@/components/client/orderTitle";
import SpanningTable from "@/components/client/table/SpanningTable";
import CustomerInfo from "@/components/client/CustomerInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

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

  console.log(order)
  const persona = {};

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
              <FontAwesomeIcon icon={faClipboardList} /> Order
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
            <CustomerInfo title="Información del cliente" data={order.beneficiary}></CustomerInfo>
            <CustomerInfo title="Entrega" data={order.beneficiary}></CustomerInfo>
          </Paper>
        </Grid>
        <Grid xs={8} sx={{ mt: 5 }}>
          <Paper sx={{ p: 1 }}>
            <Typography variant="h6">Historial</Typography>
            <Container>
              <Typography variant="subtitle2" gutterBottom>
                arrival at
              </Typography>
              <Typography>1/1/1</Typography>
            </Container>
            <Container>
              <Typography variant="subtitle2" gutterBottom>
                delivery at
              </Typography>
              <Typography>2/2/2</Typography>
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
