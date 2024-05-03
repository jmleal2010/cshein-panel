import { LOAD_ORDER_QUERY } from "@/graphql/queries";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Grid,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getClient } from "@/config/apollo";
import Avatar from "@mui/joy/Avatar";
import { red } from "@mui/material/colors";
import IconButton from "@mui/joy/IconButton";
import { Edit } from "@mui/icons-material";
import OrderHeader from "@/components/common/orderHeader";
import ListItem from "@mui/joy/ListItem";
import { Order } from "@/interfaces";
import { Fragment } from "react";
import OrderItemTable from "@/components/client/table/OrderItemTable";
import OrderTitle from "@/components/client/orderTitle";
import SpanningTable from "@/components/client/table/SpanningTable";
import OrderHistory from "@/components/client/OrderHistory";
import CustomerInfo from "@/components/client/CustomerInfo";

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
        orderId: params.id,
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

export default async function OrderId({ params }: { params: { id: string } }) {
  // console.log(params);
  const response = await getOrder(params);
  const order = response?.data.order || {};

  console.log(order);
  let orderItems = order.orderItems.map((item: any) => {
    const { product, quantity } = item;
    return { ...product, quantity };
  });
  const persona = {};

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container>
        <Grid xs={12}>
          <OrderTitle orderId={order.id}></OrderTitle>
        </Grid>
        <Grid xs={8}>
          <Paper>
            <SpanningTable items={order.orderItems}></SpanningTable>
          </Paper>
        </Grid>
        <Grid xs={4}>
          <CustomerInfo beneficiary={order.beneficiary}></CustomerInfo>
        </Grid>
        <Grid xs={8} sx={{ mt: 5 }}>
          {/* <OrderHistory>

                  </OrderHistory> */}
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
